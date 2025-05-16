/* eslint-disable */
/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BlueprintStats {
    /** @format int32 */
    kills?: number;
    /** @format int32 */
    built?: number;
    /** @format int32 */
    lost?: number;
    /** @format int32 */
    lowest_health?: number;
}

export interface BuiltStats {
    /** @format double */
    mass?: number;
    /** @format int32 */
    count?: number;
    /** @format double */
    energy?: number;
}

export interface GeneralStats {
    /** @format int32 */
    score?: number;
    lost?: LostStats;
    kills?: KillStats;
    built?: BuiltStats;
    /** @format int32 */
    lastupdatetick?: number;
    /** @format int32 */
    currentcap?: number;
    /** @format int32 */
    currentunits?: number;
}

export interface InStats {
    /** @format double */
    total?: number;
    /** @format double */
    reclaimed?: number;
    /** @format double */
    reclaimRate?: number;
    /** @format double */
    rate?: number;
}

export interface KillStats {
    /** @format double */
    mass?: number;
    /** @format int32 */
    count?: number;
    /** @format double */
    energy?: number;
}

export interface LostStats {
    /** @format double */
    mass?: number;
    /** @format int32 */
    count?: number;
    /** @format double */
    energy?: number;
}

export interface OutStats {
    /** @format double */
    total?: number;
    /** @format double */
    rate?: number;
    /** @format double */
    excess?: number;
}

export interface Replay {
    /** @format int64 */
    id?: number;
    /** @format date-time */
    importDate?: string;
    replayTitle?: string;
    /** @format int32 */
    replayVersion?: number;
    replayCompression?: string;
    complete?: boolean;
    featuredMod?: string;
    /** @format int64 */
    gameStart?: number;
    /** @format int64 */
    gameEnd?: number;
    /** @format int32 */
    numberOfPlayers?: number;
    recorder?: string;
    supComVersion?: string;
    mapName?: string;
    cheatsEnabled?: boolean;
    /** @format int32 */
    randomSeed?: number;
    players?: Record<string, ReplayPlayer>;
    chatMessages?: ReplayChatMessage[];
    playerScores?: ReplayPlayerSummary[];
    scenarioInformation?: Record<string, object>;
    gameType?: string;
}

export interface ReplayChatMessage {
    /** @format int64 */
    id?: number;
    /** @format int32 */
    tick?: number;
    sender?: string;
    receiver?: string;
    message?: string;
    marker?: boolean;
}

export interface ReplayPlayer {
    /** @format int64 */
    id?: number;
    name?: string;
    /** @format int32 */
    playerId?: number;
    /** @format double */
    massShared?: number;
    /** @format double */
    energyShared?: number;
    /** @format double */
    massReceived?: number;
    /** @format double */
    energyReceived?: number;
    armyInformation?: Record<string, object>;
    apmPerMinute?: ReplayPlayerApm[];
    targetOrders?: TargetOrder[];
}

export interface ReplayPlayerApm {
    /** @format int64 */
    id?: number;
    /** @format int32 */
    minute?: number;
    /** @format double */
    apm?: number;
}

export interface ReplayPlayerSummary {
    /** @format int64 */
    id?: number;
    type?: string;
    name?: string;
    /** @format int32 */
    faction?: number;
    general?: GeneralStats;
    blueprints?: Record<string, BlueprintStats>;
    resources?: ResourceStats;
    units?: UnitStats;
    /** @format double */
    Defeated?: number;
}

export interface ResourceStats {
    storage?: StorageStats;
    massin?: InStats;
    massout?: OutStats;
    energyin?: InStats;
    energyout?: OutStats;
}

export interface StorageStats {
    /** @format double */
    maxMass?: number;
    /** @format double */
    storedMass?: number;
    /** @format double */
    maxEnergy?: number;
    /** @format double */
    storedEnergy?: number;
}

export interface TargetOrder {
    /** @format int64 */
    id?: number;
    /** @format int32 */
    tick?: number;
    /** @format double */
    targetX?: number;
    /** @format double */
    targetY?: number;
    /** @format double */
    targetZ?: number;
    orderType?:
        | "UNITCOMMAND_None"
        | "UNITCOMMAND_Stop"
        | "UNITCOMMAND_Move"
        | "UNITCOMMAND_Dive"
        | "UNITCOMMAND_FormMove"
        | "UNITCOMMAND_BuildSiloTactical"
        | "UNITCOMMAND_BuildSiloNuke"
        | "UNITCOMMAND_BuildFactory"
        | "UNITCOMMAND_BuildMobile"
        | "UNITCOMMAND_BuildAssist"
        | "UNITCOMMAND_Attack"
        | "UNITCOMMAND_FormAttack"
        | "UNITCOMMAND_Nuke"
        | "UNITCOMMAND_Tactical"
        | "UNITCOMMAND_Teleport"
        | "UNITCOMMAND_Guard"
        | "UNITCOMMAND_Patrol"
        | "UNITCOMMAND_Ferry"
        | "UNITCOMMAND_FormPatrol"
        | "UNITCOMMAND_Reclaim"
        | "UNITCOMMAND_Repair"
        | "UNITCOMMAND_Capture"
        | "UNITCOMMAND_TransportLoadUnits"
        | "UNITCOMMAND_TransportReverseLoadUnits"
        | "UNITCOMMAND_TransportUnloadUnits"
        | "UNITCOMMAND_TransportUnloadSpecificUnits"
        | "UNITCOMMAND_DetachFromTransport"
        | "UNITCOMMAND_Upgrade"
        | "UNITCOMMAND_Script"
        | "UNITCOMMAND_AssistCommander"
        | "UNITCOMMAND_KillSelf"
        | "UNITCOMMAND_DestroySelf"
        | "UNITCOMMAND_Sacrifice"
        | "UNITCOMMAND_Pause"
        | "UNITCOMMAND_OverCharge"
        | "UNITCOMMAND_AggressiveMove"
        | "UNITCOMMAND_FormAggressiveMove"
        | "UNITCOMMAND_AssistMove"
        | "UNITCOMMAND_SpecialAction"
        | "UNITCOMMAND_Dock";
}

export interface UnitDetail {
    /** @format int32 */
    lost?: number;
    /** @format int32 */
    kills?: number;
    /** @format int32 */
    built?: number;
}

export interface UnitStats {
    air?: UnitDetail;
    tech3?: UnitDetail;
    experimental?: UnitDetail;
    tech2?: UnitDetail;
    tech1?: UnitDetail;
    land?: UnitDetail;
    naval?: UnitDetail;
    transportation?: UnitDetail;
    structures?: UnitDetail;
    sacu?: UnitDetail;
    engineer?: UnitDetail;
    cdr?: UnitDetail;
}

export interface Page {
    /** @format int64 */
    totalElements?: number;
    /** @format int32 */
    totalPages?: number;
    /** @format int32 */
    size?: number;
    content?: object[];
    /** @format int32 */
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    /** @format int32 */
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
}

export interface PageableObject {
    /** @format int64 */
    offset?: number;
    sort?: SortObject;
    /** @format int32 */
    pageNumber?: number;
    paged?: boolean;
    /** @format int32 */
    pageSize?: number;
    unpaged?: boolean;
}

export interface SortObject {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "http://localhost:8080";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private baseApiParams: RequestParams = {
        credentials: "same-origin",
        headers: {},
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };
    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
        [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === "object" && property !== null
                            ? JSON.stringify(property)
                            : `${property}`,
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);

        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };

    public request = async <T = any, E = any>({
                                                  body,
                                                  secure,
                                                  path,
                                                  type,
                                                  query,
                                                  format,
                                                  baseUrl,
                                                  cancelToken,
                                                  ...params
                                              }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter = this.contentFormatters[type || ContentType.Json];
        const responseFormat = format || requestParams.format;

        return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? {"Content-Type": type} : {}),
            },
            signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
            body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
        }).then(async (response) => {
            const r = response.clone() as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                    .then((data) => {
                        if (r.ok) {
                            r.data = data;
                        } else {
                            r.error = data;
                        }
                        return r;
                    })
                    .catch((e) => {
                        r.error = e;
                        return r;
                    });

            if (cancelToken) {
                this.abortControllers.delete(cancelToken);
            }

            if (!response.ok) throw data;
            return data;
        });
    };

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
            .join("&");
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
    };

    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @tags replay-controller
         * @name UploadReplay
         * @summary Upload a FAF replay file
         * @request POST:/api/v1/replays/upload
         */
        uploadReplay: (
            data: {
                /**
                 * The replay file to analyse. Has to be a .fafreplay file
                 * @format binary
                 */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<Replay, void>({
                path: `/api/v1/replays/upload`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags replay-controller
         * @name DeleteAllReplays
         * @summary Deletes all replays
         * @request POST:/api/v1/replays/delete
         */
        deleteAllReplays: (params: RequestParams = {}) =>
            this.request<number, void>({
                path: `/api/v1/replays/delete`,
                method: "POST",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags replay-controller
         * @name GetReplayById
         * @summary Analyses a replay by id
         * @request GET:/api/v1/replays/{replayId}
         */
        getReplayById: (
            replayId: number,
            query?: {
                /**
                 * To forcibly reanalyze the given replay, if it was already analyzed.
                 * @default false
                 * @example false
                 */
                force?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<Replay, void>({
                path: `/api/v1/replays/${replayId}`,
                method: "GET",
                query: query,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags replay-controller
         * @name SearchReplays
         * @summary Search replays based on a string match across various fields
         * @request GET:/api/v1/replays/search
         */
        searchReplays: (
            query: {
                query: string;
                /** @default "all" */
                completeStatus?: string;
                mods?: string[];
                gameTypes?: string[];
                /** @format int32 */
                numberOfPlayersMin?: number;
                /** @format int32 */
                numberOfPlayersMax?: number;
                /** @format date-time */
                timeFrameStart?: string;
                /** @format date-time */
                timeFrameEnd?: string;
                /** @default false */
                rankedOnly?: boolean;
                /**
                 * @format int32
                 * @default 0
                 */
                page?: number;
                /**
                 * @format int32
                 * @default 10
                 */
                size?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Page, void>({
                path: `/api/v1/replays/search`,
                method: "GET",
                query: query,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags replay-controller
         * @name GetReplaysByRange
         * @summary Analyses a replay by id range
         * @request GET:/api/v1/replays/range
         */
        getReplaysByRange: (
            query: {
                /**
                 * The start index
                 * @format int64
                 * @example 21428000
                 */
                from: number;
                /**
                 * The end index
                 * @format int64
                 * @example 21428010
                 */
                to: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<string, void>({
                path: `/api/v1/replays/range`,
                method: "GET",
                query: query,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags replay-controller
         * @name GetReplaysByPlayerName
         * @summary Returns all replays of a specific player
         * @request GET:/api/v1/replays/player/{username}
         */
        getReplaysByPlayerName: (username: string, params: RequestParams = {}) =>
            this.request<string, void>({
                path: `/api/v1/replays/player/${username}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags replay-controller
         * @name GetAllReplayIds
         * @summary Retrieve all replay IDs with pagination
         * @request GET:/api/v1/replays/ids
         */
        getAllReplayIds: (
            query?: {
                /**
                 * @format int32
                 * @default 0
                 */
                page?: number;
                /**
                 * @format int32
                 * @default 10
                 */
                size?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Page, void>({
                path: `/api/v1/replays/ids`,
                method: "GET",
                query: query,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags replay-controller
         * @name GetReplayFile
         * @summary Download a FAF replay file by its ID
         * @request GET:/api/v1/replays/download/{replayId}
         */
        getReplayFile: (replayId: number, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/api/v1/replays/download/${replayId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags player-controller
         * @name GetPlayerStatsSummary
         * @summary A summary of the stats a given playername
         * @request GET:/api/v1/players/{playerName}/summary
         */
        getPlayerStatsSummary: (playerName: string, params: RequestParams = {}) =>
            this.request<number, void>({
                path: `/api/v1/players/${playerName}/summary`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags player-controller
         * @name SearchPlayerNames
         * @summary Search players available in replays by playername
         * @request GET:/api/v1/players/search
         */
        searchPlayerNames: (
            query?: {
                /** @default "" */
                searchTerm?: string;
                /**
                 * @format int32
                 * @default 0
                 */
                page?: number;
                /**
                 * @format int32
                 * @default 10
                 */
                size?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Page, void>({
                path: `/api/v1/players/search`,
                method: "GET",
                query: query,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags player-controller
         * @name GetPlayerNames
         * @summary Lists all players available in replays
         * @request GET:/api/v1/players/list
         */
        getPlayerNames: (
            query?: {
                /**
                 * @format int32
                 * @default 0
                 */
                page?: number;
                /**
                 * @format int32
                 * @default 10
                 */
                size?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Page, void>({
                path: `/api/v1/players/list`,
                method: "GET",
                query: query,
                format: "json",
                ...params,
            }),
    };
}
