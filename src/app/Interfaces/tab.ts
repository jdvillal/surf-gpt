export interface Url {
    url: string;
};
export class TabInstance {
    public current_Url: Url;
    private prev_stack: Url[] = [];
    private next_stack: Url[] = [];

    public constructor(tabUrl: Url) {
        this.current_Url = tabUrl
    }
    public getCurrentUrl(): Url {
        return this.current_Url;
    }
    public hasPreviousUrl(): boolean {
        return !this.prev_stack[this.prev_stack.length - 1] === undefined;
    }
    public hasNextUrl(): boolean {
        return !this.next_stack[this.next_stack.length - 1] === undefined;
    }
    private popPreviousUrl(): Url | undefined {
        return this.prev_stack.pop();
    }
    private popNextUrl(): Url | undefined {
        return this.next_stack.pop();
    }
    public gotoPreviousUrl(): Url {
        this.next_stack.push(this.current_Url);
        let prev = this.popPreviousUrl();
        if (prev === undefined) {
            return { url: "" };
        }
        this.current_Url = prev;
        return this.current_Url;
    }
    public gotoNextUrl(): Url {
        this.prev_stack.push(this.current_Url);
        let next = this.popNextUrl();
        if(next === undefined) {
            return { url: "" };
        }
        this.current_Url = next;
        return this.current_Url;
    }

    public updateUrl(new_Url: Url): Url {
        this.next_stack = [];
        this.prev_stack.push(this.current_Url);
        this.current_Url = new_Url;
        return this.current_Url;
    }

}

export class URLs{
    static isValidHttpUrl(str: string) {
        let url;
        try {
          url = new URL(str);
        } catch (_) {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    static isValidWWWUrl(str: string) {
        return str.startsWith("www.");
    }
}