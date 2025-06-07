import { Boot } from "./local/decorators/Boot";
import { ServerManager } from "./local/helpers/ServerManager";

@Boot()
export class App {

    public static serverManager: ServerManager = new ServerManager();

    constructor() {}
}
