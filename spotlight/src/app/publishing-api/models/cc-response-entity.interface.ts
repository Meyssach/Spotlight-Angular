export interface CCResponseEntity<T> {
    data: T;
    result: {
        message: string,
        status: string,
    };
}
