// Image is a plain object representation of an image entity.
// It is used for data transfer and manipulation within the application.

/**
 * Image plain object for image data transfer.
 * @property u_id - Unique identifier for the image.
 * @property url - The URL or S3 key of the image.
 * @property owner - The user ID of the image owner.
 * @property visibility - Visibility status (e.g., 'public', 'private').
 * @property created_at - Timestamp of image creation.
 * @property updated_at - Timestamp of last update.
 * @property status - Status code or state of the image.
 */
export class Image {
    description: string;
    visibility: string;
    url: string;

    constructor(
        description: string,
        visibility: string,
        url: string
    ) {
        this.description = description;
        this.visibility = visibility;
        this.url = url;
    }

    public static parse(obj: any) {
        return new this(obj.description, obj.visibility, obj.url);
    }
}