/**
 * ContentType enum defines common MIME types used for HTTP request and response headers.
 * Use these values to specify the content type for API endpoints.
 */
export enum ContentType {
    TEXT_PLAIN = "text/plain",
    APP_JSON = "application/json",
    IMAGE_JPEG = "image/jpeg",
    MULTIPART_FORM = "multipart/form-data"

    // To add more types, simply extend this enum (e.g., APP_XML = "application/xml")
}