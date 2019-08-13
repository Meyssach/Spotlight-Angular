import { Category } from './../../../publishing-api/models/category.class';
import { IssueToSpotlightMapper } from './../model/issue-spotlight-mapper.class';
import {Injectable} from '@angular/core';
import {EntitiesService} from '../../../publishing-api/services/entities.service';
import { Observable, combineLatest, of } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {EntityTypes} from '../../../publishing-api/models/entity-types.enum';
import {Issue} from '../../../publishing-api/models/issue.class';
import {Title} from '../../../publishing-api/models/title.class';
import {StateService} from '@uirouter/core';
import {SpotlightInfoInterface} from '../model/spotlight-info.interface';
import {UiRouterParams} from '../model/actions/uirouter-params.interface';
import {SpotlightActions} from '../model/actions/spolight-actions.enum';
import {AnalyticsService} from '../../../analytics/service/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { SpotlightDataInterface } from '../model/spotlight-data.interface';
import { SpotlightActionButtonsDataInterface } from '../model/spotlight-action-buttons-data.interface';

@Injectable({
    providedIn: 'root'
})
export class SpotlightService {

    private actions = {};

    constructor(
        private entitiesService: EntitiesService,
        private stateService: StateService,
        private translate: TranslateService,
        private analyticsService: AnalyticsService
    ) {
        this.initActions();
    }

    public goTo(routParams: UiRouterParams) {
        this.stateService.go(routParams.state, routParams.params);
    }

    public initActions() {
        this.actions[SpotlightActions.GOTO] = (params: UiRouterParams) => {
            if (params !== null) {
                this.goTo(params);
            }
        };
    }

    /**
     * Extract mandatory informations type and reference from a spotlightInfo object
     * @param spotlightInfo Data furnished by Stitch API
     */
    private parseInfo(spotlightInfo: SpotlightInfoInterface): { type: EntityTypes, ref: string } {
        let type = <EntityTypes>spotlightInfo.type.toLocaleLowerCase();
        let ref = spotlightInfo.data.reference;
        if (type === EntityTypes.Category && spotlightInfo.data.customReference) {
            type = EntityTypes.Title;
            ref = spotlightInfo.data.customReference;
        }
        return {type, ref: ref};
    }

    /**
     * Returns the first Issue from a category, a title or an Issue
     * @param type of entity
     * @param ref is the reference
     */
    private getFirstEntity(type: EntityTypes, ref: string): Observable<Issue> {
        let request: Observable<Issue | Title | Category>;
        if (type === EntityTypes.Issue) {
            request = this.entitiesService.getEntityDetails(EntityTypes.Issue, ref);
        } else {
            request = this.entitiesService.getEntityItems(type, ref, 1).pipe(
                map((entityInfo) => {
                    if (entityInfo !== null && entityInfo.data.length > 0) {
                        return entityInfo.data[0];
                    } else {
                        return null;
                    }
                })
            );
        }
        return request as Observable<Issue>;
    }

    /**
     * Fetch an Entity (Issue or Title) from the EntityService and convert it to a SpotlightData object
     * @param spotlightInfo Data furnished by Stitch API
     */
    public getSpotlight(spotlightInfo: SpotlightInfoInterface): Observable<SpotlightDataInterface> {
        const {type, ref} = this.parseInfo(spotlightInfo);
        // Don't need to do the parent request if it's the issue itself
        const parentRequest: Observable<Issue | Title | undefined> =
            type !== EntityTypes.Issue
                ? this.entitiesService.getEntityDetails(type, ref)
                : of(undefined);

        return combineLatest(
                this.getFirstEntity(type, ref),
                parentRequest
            )
            .pipe(map(([entity, entityDetails]) => {
                const mappedSpotlightInfo = IssueToSpotlightMapper
                    .map(spotlightInfo, entity, entityDetails);

                mappedSpotlightInfo.listButtons.forEach(button => {
                    button.buttonTitle = this.translate.instant(button.buttonTitle);
                });
                mappedSpotlightInfo.imageAction.buttonTitle = this.translate.instant(mappedSpotlightInfo.imageAction.buttonTitle);
                return mappedSpotlightInfo;
            }));
    }

    /**
     * Execute predefined actions (GOTO: UIRouter navigation, download: download an open book, delete: delete archive, ...)
     * sent by the SpotlightComponent
     * @param action button action to be executed
     */
    public executeAction(action: SpotlightActionButtonsDataInterface) {
        const execute = this.actions[<SpotlightActions>action.buttonAction];
        if (execute !== null) {
            const params = (action.params as any);
            this.analyticsService.sendEventTrack(params.analytics.action, params.analytics.params);
            execute(action.params);
        }
    }
}
