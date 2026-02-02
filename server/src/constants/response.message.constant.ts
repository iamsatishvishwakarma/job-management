export default {
    SUCCESS: `The operation has been successful`,
    SOMETHING_WENT_WRONG: `Something went wrong!`,
    NOT_FOUND: (entity: string) => `${entity} not found`,
    SUCCESSFULLY: {
        CREATED: (entity: string) => `${entity} created successfully`,
        FETCHED: (entity: string) => `${entity} fetched successfully`,
        UPDATED: (entity: string) => `${entity} updated successfully`,
        DELETED: (entity: string) => `${entity} deleted successfully`,
    },
    FAILED: {
        TO_CREATE: (entity: string) => `Failed to create ${entity}`,
        TO_UPDATE: (entity: string) => `Failed to update ${entity}`,
        TO_DELETE: (entity: string) => `Failed to delete ${entity}`,
    },
    TOO_MANY_REQUESTS: `Too many requests! Please try again after some time`,
    BAD_REQUEST: (message: string) => message,
    UNAUTHORIZED: (message: string) => message,
    FORBIDDEN: (message: string) => message,
    INTERNAL_SERVER_ERROR: `Internal server error`,
}
