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