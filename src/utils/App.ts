import { hashSync, compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as Config from "../config/Config";
import { Props } from "./Props";

export class App {
    private static uniqueId: number = 0;
    public static NON_ALPHA_NUMARIC = /[^\w\s]/g;

    public static UniqueCode(): string {
        var time: number = new Date().getTime();
        if (this.uniqueId == time) {
            while (new Date().getTime() < 1 + time) {}
            time = new Date().getTime();
        }
        this.uniqueId = time;
        return time.toString(36).toUpperCase();
    }

    public static UniqueNumber(): number {
        var time: number = new Date().getTime();
        if (this.uniqueId == time) {
            while (new Date().getTime() < 1 + time) {}
            time = new Date().getTime();
        }
        this.uniqueId = time;
        return time;
    }

    public static UniqueID(name: string, type: string): string {
        var str: string = "";

        if (type) {
            str = type + "_" + name;
        } else {
            str = name + "_" + App.UniqueCode();
        }
        str = str.replace(App.NON_ALPHA_NUMARIC, "_");
        str = str.replace(/\s/g, "_");
        str = str.substr(0, 128);
        return str.toUpperCase();
    }

    public static HashSync(data: string) {
        return hashSync(data, 8);
    }

    public static HashCompareSync(param1: string, param2: string) {
        return compareSync(param1, param2);
    }

    public static EncodeJWT(data: any) {
        return jwt.sign(data, Config.token, { expiresIn: "24h" });
    }

    public static RefreshJWT(data: any) {
        return jwt.sign(data, Config.token, { expiresIn: "24h" });
    }

    public static DecodeJWT(token: any) {}

    public static ValildateUserAccess(data: any, component: String, access: String, baseAuth?: boolean) {
        if (data) {
            if (data.name && data.message && data.name.lowercase().indexOf("error") > -1) {
                return false;
            } else {
                if (data.baseAuth != null) {
                    if (data.baseAuth == true && baseAuth == true) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    public static verifyToken(req: any, res: any, next: any) {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) return res.status(401).json({ status: 0, message: Props.NO_TOKEN_MESSAGE });
        try {
            const decoded = jwt.verify(token, Config.token);
            req.user = decoded;
            next();
        } catch {
            res.status(401).json({ status: 0, message: Props.INVALID_TOKEN });
        }
    }
}
