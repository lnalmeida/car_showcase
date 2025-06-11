
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DealershipInfo
 * 
 */
export type DealershipInfo = $Result.DefaultSelection<Prisma.$DealershipInfoPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserSavedVehicle
 * 
 */
export type UserSavedVehicle = $Result.DefaultSelection<Prisma.$UserSavedVehiclePayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model VisitBooking
 * 
 */
export type VisitBooking = $Result.DefaultSelection<Prisma.$VisitBookingPayload>
/**
 * Model WorkingHour
 * 
 */
export type WorkingHour = $Result.DefaultSelection<Prisma.$WorkingHourPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const BookingStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  NO_SHOW: 'NO_SHOW'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const DayOfWeek: {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DealershipInfos
 * const dealershipInfos = await prisma.dealershipInfo.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DealershipInfos
   * const dealershipInfos = await prisma.dealershipInfo.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.dealershipInfo`: Exposes CRUD operations for the **DealershipInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DealershipInfos
    * const dealershipInfos = await prisma.dealershipInfo.findMany()
    * ```
    */
  get dealershipInfo(): Prisma.DealershipInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSavedVehicle`: Exposes CRUD operations for the **UserSavedVehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSavedVehicles
    * const userSavedVehicles = await prisma.userSavedVehicle.findMany()
    * ```
    */
  get userSavedVehicle(): Prisma.UserSavedVehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.visitBooking`: Exposes CRUD operations for the **VisitBooking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VisitBookings
    * const visitBookings = await prisma.visitBooking.findMany()
    * ```
    */
  get visitBooking(): Prisma.VisitBookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workingHour`: Exposes CRUD operations for the **WorkingHour** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkingHours
    * const workingHours = await prisma.workingHour.findMany()
    * ```
    */
  get workingHour(): Prisma.WorkingHourDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.1
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    DealershipInfo: 'DealershipInfo',
    User: 'User',
    UserSavedVehicle: 'UserSavedVehicle',
    Vehicle: 'Vehicle',
    VisitBooking: 'VisitBooking',
    WorkingHour: 'WorkingHour'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "dealershipInfo" | "user" | "userSavedVehicle" | "vehicle" | "visitBooking" | "workingHour"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DealershipInfo: {
        payload: Prisma.$DealershipInfoPayload<ExtArgs>
        fields: Prisma.DealershipInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DealershipInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DealershipInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>
          }
          findFirst: {
            args: Prisma.DealershipInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DealershipInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>
          }
          findMany: {
            args: Prisma.DealershipInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>[]
          }
          create: {
            args: Prisma.DealershipInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>
          }
          createMany: {
            args: Prisma.DealershipInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DealershipInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>[]
          }
          delete: {
            args: Prisma.DealershipInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>
          }
          update: {
            args: Prisma.DealershipInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>
          }
          deleteMany: {
            args: Prisma.DealershipInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DealershipInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DealershipInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>[]
          }
          upsert: {
            args: Prisma.DealershipInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealershipInfoPayload>
          }
          aggregate: {
            args: Prisma.DealershipInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDealershipInfo>
          }
          groupBy: {
            args: Prisma.DealershipInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<DealershipInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.DealershipInfoCountArgs<ExtArgs>
            result: $Utils.Optional<DealershipInfoCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserSavedVehicle: {
        payload: Prisma.$UserSavedVehiclePayload<ExtArgs>
        fields: Prisma.UserSavedVehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSavedVehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSavedVehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>
          }
          findFirst: {
            args: Prisma.UserSavedVehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSavedVehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>
          }
          findMany: {
            args: Prisma.UserSavedVehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>[]
          }
          create: {
            args: Prisma.UserSavedVehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>
          }
          createMany: {
            args: Prisma.UserSavedVehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSavedVehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>[]
          }
          delete: {
            args: Prisma.UserSavedVehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>
          }
          update: {
            args: Prisma.UserSavedVehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>
          }
          deleteMany: {
            args: Prisma.UserSavedVehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSavedVehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSavedVehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>[]
          }
          upsert: {
            args: Prisma.UserSavedVehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSavedVehiclePayload>
          }
          aggregate: {
            args: Prisma.UserSavedVehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSavedVehicle>
          }
          groupBy: {
            args: Prisma.UserSavedVehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSavedVehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSavedVehicleCountArgs<ExtArgs>
            result: $Utils.Optional<UserSavedVehicleCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      VisitBooking: {
        payload: Prisma.$VisitBookingPayload<ExtArgs>
        fields: Prisma.VisitBookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VisitBookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VisitBookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>
          }
          findFirst: {
            args: Prisma.VisitBookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VisitBookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>
          }
          findMany: {
            args: Prisma.VisitBookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>[]
          }
          create: {
            args: Prisma.VisitBookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>
          }
          createMany: {
            args: Prisma.VisitBookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VisitBookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>[]
          }
          delete: {
            args: Prisma.VisitBookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>
          }
          update: {
            args: Prisma.VisitBookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>
          }
          deleteMany: {
            args: Prisma.VisitBookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VisitBookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VisitBookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>[]
          }
          upsert: {
            args: Prisma.VisitBookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitBookingPayload>
          }
          aggregate: {
            args: Prisma.VisitBookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisitBooking>
          }
          groupBy: {
            args: Prisma.VisitBookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<VisitBookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.VisitBookingCountArgs<ExtArgs>
            result: $Utils.Optional<VisitBookingCountAggregateOutputType> | number
          }
        }
      }
      WorkingHour: {
        payload: Prisma.$WorkingHourPayload<ExtArgs>
        fields: Prisma.WorkingHourFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkingHourFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkingHourFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>
          }
          findFirst: {
            args: Prisma.WorkingHourFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkingHourFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>
          }
          findMany: {
            args: Prisma.WorkingHourFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>[]
          }
          create: {
            args: Prisma.WorkingHourCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>
          }
          createMany: {
            args: Prisma.WorkingHourCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkingHourCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>[]
          }
          delete: {
            args: Prisma.WorkingHourDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>
          }
          update: {
            args: Prisma.WorkingHourUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>
          }
          deleteMany: {
            args: Prisma.WorkingHourDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkingHourUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkingHourUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>[]
          }
          upsert: {
            args: Prisma.WorkingHourUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHourPayload>
          }
          aggregate: {
            args: Prisma.WorkingHourAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkingHour>
          }
          groupBy: {
            args: Prisma.WorkingHourGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkingHourGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkingHourCountArgs<ExtArgs>
            result: $Utils.Optional<WorkingHourCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    dealershipInfo?: DealershipInfoOmit
    user?: UserOmit
    userSavedVehicle?: UserSavedVehicleOmit
    vehicle?: VehicleOmit
    visitBooking?: VisitBookingOmit
    workingHour?: WorkingHourOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DealershipInfoCountOutputType
   */

  export type DealershipInfoCountOutputType = {
    visitBookings: number
    workingHours: number
  }

  export type DealershipInfoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visitBookings?: boolean | DealershipInfoCountOutputTypeCountVisitBookingsArgs
    workingHours?: boolean | DealershipInfoCountOutputTypeCountWorkingHoursArgs
  }

  // Custom InputTypes
  /**
   * DealershipInfoCountOutputType without action
   */
  export type DealershipInfoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfoCountOutputType
     */
    select?: DealershipInfoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DealershipInfoCountOutputType without action
   */
  export type DealershipInfoCountOutputTypeCountVisitBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitBookingWhereInput
  }

  /**
   * DealershipInfoCountOutputType without action
   */
  export type DealershipInfoCountOutputTypeCountWorkingHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkingHourWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    savedCars: number
    visitBooking: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    savedCars?: boolean | UserCountOutputTypeCountSavedCarsArgs
    visitBooking?: boolean | UserCountOutputTypeCountVisitBookingArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedCarsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSavedVehicleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVisitBookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitBookingWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    savedBy: number
    visits: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    savedBy?: boolean | VehicleCountOutputTypeCountSavedByArgs
    visits?: boolean | VehicleCountOutputTypeCountVisitsArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountSavedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSavedVehicleWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitBookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DealershipInfo
   */

  export type AggregateDealershipInfo = {
    _count: DealershipInfoCountAggregateOutputType | null
    _min: DealershipInfoMinAggregateOutputType | null
    _max: DealershipInfoMaxAggregateOutputType | null
  }

  export type DealershipInfoMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    socialMedia: string | null
    logoUrl: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    workingHourId: string | null
  }

  export type DealershipInfoMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    socialMedia: string | null
    logoUrl: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    workingHourId: string | null
  }

  export type DealershipInfoCountAggregateOutputType = {
    id: number
    name: number
    address: number
    phone: number
    email: number
    website: number
    socialMedia: number
    logoUrl: number
    description: number
    createdAt: number
    updatedAt: number
    workingHourId: number
    _all: number
  }


  export type DealershipInfoMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    socialMedia?: true
    logoUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    workingHourId?: true
  }

  export type DealershipInfoMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    socialMedia?: true
    logoUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    workingHourId?: true
  }

  export type DealershipInfoCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    socialMedia?: true
    logoUrl?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    workingHourId?: true
    _all?: true
  }

  export type DealershipInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DealershipInfo to aggregate.
     */
    where?: DealershipInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealershipInfos to fetch.
     */
    orderBy?: DealershipInfoOrderByWithRelationInput | DealershipInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DealershipInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealershipInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealershipInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DealershipInfos
    **/
    _count?: true | DealershipInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DealershipInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DealershipInfoMaxAggregateInputType
  }

  export type GetDealershipInfoAggregateType<T extends DealershipInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateDealershipInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDealershipInfo[P]>
      : GetScalarType<T[P], AggregateDealershipInfo[P]>
  }




  export type DealershipInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealershipInfoWhereInput
    orderBy?: DealershipInfoOrderByWithAggregationInput | DealershipInfoOrderByWithAggregationInput[]
    by: DealershipInfoScalarFieldEnum[] | DealershipInfoScalarFieldEnum
    having?: DealershipInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DealershipInfoCountAggregateInputType | true
    _min?: DealershipInfoMinAggregateInputType
    _max?: DealershipInfoMaxAggregateInputType
  }

  export type DealershipInfoGroupByOutputType = {
    id: string
    name: string
    address: string
    phone: string | null
    email: string | null
    website: string | null
    socialMedia: string | null
    logoUrl: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    workingHourId: string
    _count: DealershipInfoCountAggregateOutputType | null
    _min: DealershipInfoMinAggregateOutputType | null
    _max: DealershipInfoMaxAggregateOutputType | null
  }

  type GetDealershipInfoGroupByPayload<T extends DealershipInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DealershipInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DealershipInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DealershipInfoGroupByOutputType[P]>
            : GetScalarType<T[P], DealershipInfoGroupByOutputType[P]>
        }
      >
    >


  export type DealershipInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    socialMedia?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workingHourId?: boolean
    visitBookings?: boolean | DealershipInfo$visitBookingsArgs<ExtArgs>
    workingHours?: boolean | DealershipInfo$workingHoursArgs<ExtArgs>
    _count?: boolean | DealershipInfoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dealershipInfo"]>

  export type DealershipInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    socialMedia?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workingHourId?: boolean
  }, ExtArgs["result"]["dealershipInfo"]>

  export type DealershipInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    socialMedia?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workingHourId?: boolean
  }, ExtArgs["result"]["dealershipInfo"]>

  export type DealershipInfoSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    socialMedia?: boolean
    logoUrl?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workingHourId?: boolean
  }

  export type DealershipInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "phone" | "email" | "website" | "socialMedia" | "logoUrl" | "description" | "createdAt" | "updatedAt" | "workingHourId", ExtArgs["result"]["dealershipInfo"]>
  export type DealershipInfoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visitBookings?: boolean | DealershipInfo$visitBookingsArgs<ExtArgs>
    workingHours?: boolean | DealershipInfo$workingHoursArgs<ExtArgs>
    _count?: boolean | DealershipInfoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DealershipInfoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DealershipInfoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DealershipInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DealershipInfo"
    objects: {
      visitBookings: Prisma.$VisitBookingPayload<ExtArgs>[]
      workingHours: Prisma.$WorkingHourPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      phone: string | null
      email: string | null
      website: string | null
      socialMedia: string | null
      logoUrl: string | null
      description: string | null
      createdAt: Date
      updatedAt: Date
      workingHourId: string
    }, ExtArgs["result"]["dealershipInfo"]>
    composites: {}
  }

  type DealershipInfoGetPayload<S extends boolean | null | undefined | DealershipInfoDefaultArgs> = $Result.GetResult<Prisma.$DealershipInfoPayload, S>

  type DealershipInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DealershipInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DealershipInfoCountAggregateInputType | true
    }

  export interface DealershipInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DealershipInfo'], meta: { name: 'DealershipInfo' } }
    /**
     * Find zero or one DealershipInfo that matches the filter.
     * @param {DealershipInfoFindUniqueArgs} args - Arguments to find a DealershipInfo
     * @example
     * // Get one DealershipInfo
     * const dealershipInfo = await prisma.dealershipInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DealershipInfoFindUniqueArgs>(args: SelectSubset<T, DealershipInfoFindUniqueArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one DealershipInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DealershipInfoFindUniqueOrThrowArgs} args - Arguments to find a DealershipInfo
     * @example
     * // Get one DealershipInfo
     * const dealershipInfo = await prisma.dealershipInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DealershipInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, DealershipInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first DealershipInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealershipInfoFindFirstArgs} args - Arguments to find a DealershipInfo
     * @example
     * // Get one DealershipInfo
     * const dealershipInfo = await prisma.dealershipInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DealershipInfoFindFirstArgs>(args?: SelectSubset<T, DealershipInfoFindFirstArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first DealershipInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealershipInfoFindFirstOrThrowArgs} args - Arguments to find a DealershipInfo
     * @example
     * // Get one DealershipInfo
     * const dealershipInfo = await prisma.dealershipInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DealershipInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, DealershipInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more DealershipInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealershipInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DealershipInfos
     * const dealershipInfos = await prisma.dealershipInfo.findMany()
     * 
     * // Get first 10 DealershipInfos
     * const dealershipInfos = await prisma.dealershipInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dealershipInfoWithIdOnly = await prisma.dealershipInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DealershipInfoFindManyArgs>(args?: SelectSubset<T, DealershipInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a DealershipInfo.
     * @param {DealershipInfoCreateArgs} args - Arguments to create a DealershipInfo.
     * @example
     * // Create one DealershipInfo
     * const DealershipInfo = await prisma.dealershipInfo.create({
     *   data: {
     *     // ... data to create a DealershipInfo
     *   }
     * })
     * 
     */
    create<T extends DealershipInfoCreateArgs>(args: SelectSubset<T, DealershipInfoCreateArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many DealershipInfos.
     * @param {DealershipInfoCreateManyArgs} args - Arguments to create many DealershipInfos.
     * @example
     * // Create many DealershipInfos
     * const dealershipInfo = await prisma.dealershipInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DealershipInfoCreateManyArgs>(args?: SelectSubset<T, DealershipInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DealershipInfos and returns the data saved in the database.
     * @param {DealershipInfoCreateManyAndReturnArgs} args - Arguments to create many DealershipInfos.
     * @example
     * // Create many DealershipInfos
     * const dealershipInfo = await prisma.dealershipInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DealershipInfos and only return the `id`
     * const dealershipInfoWithIdOnly = await prisma.dealershipInfo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DealershipInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, DealershipInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a DealershipInfo.
     * @param {DealershipInfoDeleteArgs} args - Arguments to delete one DealershipInfo.
     * @example
     * // Delete one DealershipInfo
     * const DealershipInfo = await prisma.dealershipInfo.delete({
     *   where: {
     *     // ... filter to delete one DealershipInfo
     *   }
     * })
     * 
     */
    delete<T extends DealershipInfoDeleteArgs>(args: SelectSubset<T, DealershipInfoDeleteArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one DealershipInfo.
     * @param {DealershipInfoUpdateArgs} args - Arguments to update one DealershipInfo.
     * @example
     * // Update one DealershipInfo
     * const dealershipInfo = await prisma.dealershipInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DealershipInfoUpdateArgs>(args: SelectSubset<T, DealershipInfoUpdateArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more DealershipInfos.
     * @param {DealershipInfoDeleteManyArgs} args - Arguments to filter DealershipInfos to delete.
     * @example
     * // Delete a few DealershipInfos
     * const { count } = await prisma.dealershipInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DealershipInfoDeleteManyArgs>(args?: SelectSubset<T, DealershipInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DealershipInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealershipInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DealershipInfos
     * const dealershipInfo = await prisma.dealershipInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DealershipInfoUpdateManyArgs>(args: SelectSubset<T, DealershipInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DealershipInfos and returns the data updated in the database.
     * @param {DealershipInfoUpdateManyAndReturnArgs} args - Arguments to update many DealershipInfos.
     * @example
     * // Update many DealershipInfos
     * const dealershipInfo = await prisma.dealershipInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DealershipInfos and only return the `id`
     * const dealershipInfoWithIdOnly = await prisma.dealershipInfo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DealershipInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, DealershipInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one DealershipInfo.
     * @param {DealershipInfoUpsertArgs} args - Arguments to update or create a DealershipInfo.
     * @example
     * // Update or create a DealershipInfo
     * const dealershipInfo = await prisma.dealershipInfo.upsert({
     *   create: {
     *     // ... data to create a DealershipInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DealershipInfo we want to update
     *   }
     * })
     */
    upsert<T extends DealershipInfoUpsertArgs>(args: SelectSubset<T, DealershipInfoUpsertArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of DealershipInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealershipInfoCountArgs} args - Arguments to filter DealershipInfos to count.
     * @example
     * // Count the number of DealershipInfos
     * const count = await prisma.dealershipInfo.count({
     *   where: {
     *     // ... the filter for the DealershipInfos we want to count
     *   }
     * })
    **/
    count<T extends DealershipInfoCountArgs>(
      args?: Subset<T, DealershipInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DealershipInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DealershipInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealershipInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DealershipInfoAggregateArgs>(args: Subset<T, DealershipInfoAggregateArgs>): Prisma.PrismaPromise<GetDealershipInfoAggregateType<T>>

    /**
     * Group by DealershipInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealershipInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DealershipInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DealershipInfoGroupByArgs['orderBy'] }
        : { orderBy?: DealershipInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DealershipInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDealershipInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DealershipInfo model
   */
  readonly fields: DealershipInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DealershipInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DealershipInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    visitBookings<T extends DealershipInfo$visitBookingsArgs<ExtArgs> = {}>(args?: Subset<T, DealershipInfo$visitBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    workingHours<T extends DealershipInfo$workingHoursArgs<ExtArgs> = {}>(args?: Subset<T, DealershipInfo$workingHoursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DealershipInfo model
   */ 
  interface DealershipInfoFieldRefs {
    readonly id: FieldRef<"DealershipInfo", 'String'>
    readonly name: FieldRef<"DealershipInfo", 'String'>
    readonly address: FieldRef<"DealershipInfo", 'String'>
    readonly phone: FieldRef<"DealershipInfo", 'String'>
    readonly email: FieldRef<"DealershipInfo", 'String'>
    readonly website: FieldRef<"DealershipInfo", 'String'>
    readonly socialMedia: FieldRef<"DealershipInfo", 'String'>
    readonly logoUrl: FieldRef<"DealershipInfo", 'String'>
    readonly description: FieldRef<"DealershipInfo", 'String'>
    readonly createdAt: FieldRef<"DealershipInfo", 'DateTime'>
    readonly updatedAt: FieldRef<"DealershipInfo", 'DateTime'>
    readonly workingHourId: FieldRef<"DealershipInfo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DealershipInfo findUnique
   */
  export type DealershipInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * Filter, which DealershipInfo to fetch.
     */
    where: DealershipInfoWhereUniqueInput
  }

  /**
   * DealershipInfo findUniqueOrThrow
   */
  export type DealershipInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * Filter, which DealershipInfo to fetch.
     */
    where: DealershipInfoWhereUniqueInput
  }

  /**
   * DealershipInfo findFirst
   */
  export type DealershipInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * Filter, which DealershipInfo to fetch.
     */
    where?: DealershipInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealershipInfos to fetch.
     */
    orderBy?: DealershipInfoOrderByWithRelationInput | DealershipInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DealershipInfos.
     */
    cursor?: DealershipInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealershipInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealershipInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DealershipInfos.
     */
    distinct?: DealershipInfoScalarFieldEnum | DealershipInfoScalarFieldEnum[]
  }

  /**
   * DealershipInfo findFirstOrThrow
   */
  export type DealershipInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * Filter, which DealershipInfo to fetch.
     */
    where?: DealershipInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealershipInfos to fetch.
     */
    orderBy?: DealershipInfoOrderByWithRelationInput | DealershipInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DealershipInfos.
     */
    cursor?: DealershipInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealershipInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealershipInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DealershipInfos.
     */
    distinct?: DealershipInfoScalarFieldEnum | DealershipInfoScalarFieldEnum[]
  }

  /**
   * DealershipInfo findMany
   */
  export type DealershipInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * Filter, which DealershipInfos to fetch.
     */
    where?: DealershipInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealershipInfos to fetch.
     */
    orderBy?: DealershipInfoOrderByWithRelationInput | DealershipInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DealershipInfos.
     */
    cursor?: DealershipInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealershipInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealershipInfos.
     */
    skip?: number
    distinct?: DealershipInfoScalarFieldEnum | DealershipInfoScalarFieldEnum[]
  }

  /**
   * DealershipInfo create
   */
  export type DealershipInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * The data needed to create a DealershipInfo.
     */
    data: XOR<DealershipInfoCreateInput, DealershipInfoUncheckedCreateInput>
  }

  /**
   * DealershipInfo createMany
   */
  export type DealershipInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DealershipInfos.
     */
    data: DealershipInfoCreateManyInput | DealershipInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DealershipInfo createManyAndReturn
   */
  export type DealershipInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * The data used to create many DealershipInfos.
     */
    data: DealershipInfoCreateManyInput | DealershipInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DealershipInfo update
   */
  export type DealershipInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * The data needed to update a DealershipInfo.
     */
    data: XOR<DealershipInfoUpdateInput, DealershipInfoUncheckedUpdateInput>
    /**
     * Choose, which DealershipInfo to update.
     */
    where: DealershipInfoWhereUniqueInput
  }

  /**
   * DealershipInfo updateMany
   */
  export type DealershipInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DealershipInfos.
     */
    data: XOR<DealershipInfoUpdateManyMutationInput, DealershipInfoUncheckedUpdateManyInput>
    /**
     * Filter which DealershipInfos to update
     */
    where?: DealershipInfoWhereInput
    /**
     * Limit how many DealershipInfos to update.
     */
    limit?: number
  }

  /**
   * DealershipInfo updateManyAndReturn
   */
  export type DealershipInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * The data used to update DealershipInfos.
     */
    data: XOR<DealershipInfoUpdateManyMutationInput, DealershipInfoUncheckedUpdateManyInput>
    /**
     * Filter which DealershipInfos to update
     */
    where?: DealershipInfoWhereInput
    /**
     * Limit how many DealershipInfos to update.
     */
    limit?: number
  }

  /**
   * DealershipInfo upsert
   */
  export type DealershipInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * The filter to search for the DealershipInfo to update in case it exists.
     */
    where: DealershipInfoWhereUniqueInput
    /**
     * In case the DealershipInfo found by the `where` argument doesn't exist, create a new DealershipInfo with this data.
     */
    create: XOR<DealershipInfoCreateInput, DealershipInfoUncheckedCreateInput>
    /**
     * In case the DealershipInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DealershipInfoUpdateInput, DealershipInfoUncheckedUpdateInput>
  }

  /**
   * DealershipInfo delete
   */
  export type DealershipInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
    /**
     * Filter which DealershipInfo to delete.
     */
    where: DealershipInfoWhereUniqueInput
  }

  /**
   * DealershipInfo deleteMany
   */
  export type DealershipInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DealershipInfos to delete
     */
    where?: DealershipInfoWhereInput
    /**
     * Limit how many DealershipInfos to delete.
     */
    limit?: number
  }

  /**
   * DealershipInfo.visitBookings
   */
  export type DealershipInfo$visitBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    where?: VisitBookingWhereInput
    orderBy?: VisitBookingOrderByWithRelationInput | VisitBookingOrderByWithRelationInput[]
    cursor?: VisitBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitBookingScalarFieldEnum | VisitBookingScalarFieldEnum[]
  }

  /**
   * DealershipInfo.workingHours
   */
  export type DealershipInfo$workingHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    where?: WorkingHourWhereInput
    orderBy?: WorkingHourOrderByWithRelationInput | WorkingHourOrderByWithRelationInput[]
    cursor?: WorkingHourWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkingHourScalarFieldEnum | WorkingHourScalarFieldEnum[]
  }

  /**
   * DealershipInfo without action
   */
  export type DealershipInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealershipInfo
     */
    select?: DealershipInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealershipInfo
     */
    omit?: DealershipInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealershipInfoInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkUserId: string | null
    email: string | null
    name: string | null
    imageUrl: string | null
    phone: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkUserId: string | null
    email: string | null
    name: string | null
    imageUrl: string | null
    phone: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkUserId: number
    email: number
    name: number
    imageUrl: number
    phone: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerkUserId?: true
    email?: true
    name?: true
    imageUrl?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkUserId?: true
    email?: true
    name?: true
    imageUrl?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkUserId?: true
    email?: true
    name?: true
    imageUrl?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerkUserId: string
    email: string
    name: string | null
    imageUrl: string | null
    phone: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    savedCars?: boolean | User$savedCarsArgs<ExtArgs>
    visitBooking?: boolean | User$visitBookingArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerkUserId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkUserId" | "email" | "name" | "imageUrl" | "phone" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    savedCars?: boolean | User$savedCarsArgs<ExtArgs>
    visitBooking?: boolean | User$visitBookingArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      savedCars: Prisma.$UserSavedVehiclePayload<ExtArgs>[]
      visitBooking: Prisma.$VisitBookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkUserId: string
      email: string
      name: string | null
      imageUrl: string | null
      phone: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    savedCars<T extends User$savedCarsArgs<ExtArgs> = {}>(args?: Subset<T, User$savedCarsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    visitBooking<T extends User$visitBookingArgs<ExtArgs> = {}>(args?: Subset<T, User$visitBookingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerkUserId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.savedCars
   */
  export type User$savedCarsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    where?: UserSavedVehicleWhereInput
    orderBy?: UserSavedVehicleOrderByWithRelationInput | UserSavedVehicleOrderByWithRelationInput[]
    cursor?: UserSavedVehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSavedVehicleScalarFieldEnum | UserSavedVehicleScalarFieldEnum[]
  }

  /**
   * User.visitBooking
   */
  export type User$visitBookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    where?: VisitBookingWhereInput
    orderBy?: VisitBookingOrderByWithRelationInput | VisitBookingOrderByWithRelationInput[]
    cursor?: VisitBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitBookingScalarFieldEnum | VisitBookingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserSavedVehicle
   */

  export type AggregateUserSavedVehicle = {
    _count: UserSavedVehicleCountAggregateOutputType | null
    _min: UserSavedVehicleMinAggregateOutputType | null
    _max: UserSavedVehicleMaxAggregateOutputType | null
  }

  export type UserSavedVehicleMinAggregateOutputType = {
    id: string | null
    userId: string | null
    vehicleId: string | null
    savedAt: Date | null
  }

  export type UserSavedVehicleMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    vehicleId: string | null
    savedAt: Date | null
  }

  export type UserSavedVehicleCountAggregateOutputType = {
    id: number
    userId: number
    vehicleId: number
    savedAt: number
    _all: number
  }


  export type UserSavedVehicleMinAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    savedAt?: true
  }

  export type UserSavedVehicleMaxAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    savedAt?: true
  }

  export type UserSavedVehicleCountAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    savedAt?: true
    _all?: true
  }

  export type UserSavedVehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSavedVehicle to aggregate.
     */
    where?: UserSavedVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSavedVehicles to fetch.
     */
    orderBy?: UserSavedVehicleOrderByWithRelationInput | UserSavedVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSavedVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSavedVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSavedVehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSavedVehicles
    **/
    _count?: true | UserSavedVehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSavedVehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSavedVehicleMaxAggregateInputType
  }

  export type GetUserSavedVehicleAggregateType<T extends UserSavedVehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSavedVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSavedVehicle[P]>
      : GetScalarType<T[P], AggregateUserSavedVehicle[P]>
  }




  export type UserSavedVehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSavedVehicleWhereInput
    orderBy?: UserSavedVehicleOrderByWithAggregationInput | UserSavedVehicleOrderByWithAggregationInput[]
    by: UserSavedVehicleScalarFieldEnum[] | UserSavedVehicleScalarFieldEnum
    having?: UserSavedVehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSavedVehicleCountAggregateInputType | true
    _min?: UserSavedVehicleMinAggregateInputType
    _max?: UserSavedVehicleMaxAggregateInputType
  }

  export type UserSavedVehicleGroupByOutputType = {
    id: string
    userId: string
    vehicleId: string
    savedAt: Date
    _count: UserSavedVehicleCountAggregateOutputType | null
    _min: UserSavedVehicleMinAggregateOutputType | null
    _max: UserSavedVehicleMaxAggregateOutputType | null
  }

  type GetUserSavedVehicleGroupByPayload<T extends UserSavedVehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSavedVehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSavedVehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSavedVehicleGroupByOutputType[P]>
            : GetScalarType<T[P], UserSavedVehicleGroupByOutputType[P]>
        }
      >
    >


  export type UserSavedVehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    savedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSavedVehicle"]>

  export type UserSavedVehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    savedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSavedVehicle"]>

  export type UserSavedVehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    savedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSavedVehicle"]>

  export type UserSavedVehicleSelectScalar = {
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    savedAt?: boolean
  }

  export type UserSavedVehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "vehicleId" | "savedAt", ExtArgs["result"]["userSavedVehicle"]>
  export type UserSavedVehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type UserSavedVehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type UserSavedVehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $UserSavedVehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSavedVehicle"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      vehicleId: string
      savedAt: Date
    }, ExtArgs["result"]["userSavedVehicle"]>
    composites: {}
  }

  type UserSavedVehicleGetPayload<S extends boolean | null | undefined | UserSavedVehicleDefaultArgs> = $Result.GetResult<Prisma.$UserSavedVehiclePayload, S>

  type UserSavedVehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSavedVehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSavedVehicleCountAggregateInputType | true
    }

  export interface UserSavedVehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSavedVehicle'], meta: { name: 'UserSavedVehicle' } }
    /**
     * Find zero or one UserSavedVehicle that matches the filter.
     * @param {UserSavedVehicleFindUniqueArgs} args - Arguments to find a UserSavedVehicle
     * @example
     * // Get one UserSavedVehicle
     * const userSavedVehicle = await prisma.userSavedVehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSavedVehicleFindUniqueArgs>(args: SelectSubset<T, UserSavedVehicleFindUniqueArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one UserSavedVehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSavedVehicleFindUniqueOrThrowArgs} args - Arguments to find a UserSavedVehicle
     * @example
     * // Get one UserSavedVehicle
     * const userSavedVehicle = await prisma.userSavedVehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSavedVehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSavedVehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first UserSavedVehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSavedVehicleFindFirstArgs} args - Arguments to find a UserSavedVehicle
     * @example
     * // Get one UserSavedVehicle
     * const userSavedVehicle = await prisma.userSavedVehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSavedVehicleFindFirstArgs>(args?: SelectSubset<T, UserSavedVehicleFindFirstArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first UserSavedVehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSavedVehicleFindFirstOrThrowArgs} args - Arguments to find a UserSavedVehicle
     * @example
     * // Get one UserSavedVehicle
     * const userSavedVehicle = await prisma.userSavedVehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSavedVehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSavedVehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more UserSavedVehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSavedVehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSavedVehicles
     * const userSavedVehicles = await prisma.userSavedVehicle.findMany()
     * 
     * // Get first 10 UserSavedVehicles
     * const userSavedVehicles = await prisma.userSavedVehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSavedVehicleWithIdOnly = await prisma.userSavedVehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSavedVehicleFindManyArgs>(args?: SelectSubset<T, UserSavedVehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a UserSavedVehicle.
     * @param {UserSavedVehicleCreateArgs} args - Arguments to create a UserSavedVehicle.
     * @example
     * // Create one UserSavedVehicle
     * const UserSavedVehicle = await prisma.userSavedVehicle.create({
     *   data: {
     *     // ... data to create a UserSavedVehicle
     *   }
     * })
     * 
     */
    create<T extends UserSavedVehicleCreateArgs>(args: SelectSubset<T, UserSavedVehicleCreateArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many UserSavedVehicles.
     * @param {UserSavedVehicleCreateManyArgs} args - Arguments to create many UserSavedVehicles.
     * @example
     * // Create many UserSavedVehicles
     * const userSavedVehicle = await prisma.userSavedVehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSavedVehicleCreateManyArgs>(args?: SelectSubset<T, UserSavedVehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSavedVehicles and returns the data saved in the database.
     * @param {UserSavedVehicleCreateManyAndReturnArgs} args - Arguments to create many UserSavedVehicles.
     * @example
     * // Create many UserSavedVehicles
     * const userSavedVehicle = await prisma.userSavedVehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSavedVehicles and only return the `id`
     * const userSavedVehicleWithIdOnly = await prisma.userSavedVehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSavedVehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSavedVehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a UserSavedVehicle.
     * @param {UserSavedVehicleDeleteArgs} args - Arguments to delete one UserSavedVehicle.
     * @example
     * // Delete one UserSavedVehicle
     * const UserSavedVehicle = await prisma.userSavedVehicle.delete({
     *   where: {
     *     // ... filter to delete one UserSavedVehicle
     *   }
     * })
     * 
     */
    delete<T extends UserSavedVehicleDeleteArgs>(args: SelectSubset<T, UserSavedVehicleDeleteArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one UserSavedVehicle.
     * @param {UserSavedVehicleUpdateArgs} args - Arguments to update one UserSavedVehicle.
     * @example
     * // Update one UserSavedVehicle
     * const userSavedVehicle = await prisma.userSavedVehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSavedVehicleUpdateArgs>(args: SelectSubset<T, UserSavedVehicleUpdateArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more UserSavedVehicles.
     * @param {UserSavedVehicleDeleteManyArgs} args - Arguments to filter UserSavedVehicles to delete.
     * @example
     * // Delete a few UserSavedVehicles
     * const { count } = await prisma.userSavedVehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSavedVehicleDeleteManyArgs>(args?: SelectSubset<T, UserSavedVehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSavedVehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSavedVehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSavedVehicles
     * const userSavedVehicle = await prisma.userSavedVehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSavedVehicleUpdateManyArgs>(args: SelectSubset<T, UserSavedVehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSavedVehicles and returns the data updated in the database.
     * @param {UserSavedVehicleUpdateManyAndReturnArgs} args - Arguments to update many UserSavedVehicles.
     * @example
     * // Update many UserSavedVehicles
     * const userSavedVehicle = await prisma.userSavedVehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSavedVehicles and only return the `id`
     * const userSavedVehicleWithIdOnly = await prisma.userSavedVehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSavedVehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSavedVehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one UserSavedVehicle.
     * @param {UserSavedVehicleUpsertArgs} args - Arguments to update or create a UserSavedVehicle.
     * @example
     * // Update or create a UserSavedVehicle
     * const userSavedVehicle = await prisma.userSavedVehicle.upsert({
     *   create: {
     *     // ... data to create a UserSavedVehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSavedVehicle we want to update
     *   }
     * })
     */
    upsert<T extends UserSavedVehicleUpsertArgs>(args: SelectSubset<T, UserSavedVehicleUpsertArgs<ExtArgs>>): Prisma__UserSavedVehicleClient<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of UserSavedVehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSavedVehicleCountArgs} args - Arguments to filter UserSavedVehicles to count.
     * @example
     * // Count the number of UserSavedVehicles
     * const count = await prisma.userSavedVehicle.count({
     *   where: {
     *     // ... the filter for the UserSavedVehicles we want to count
     *   }
     * })
    **/
    count<T extends UserSavedVehicleCountArgs>(
      args?: Subset<T, UserSavedVehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSavedVehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSavedVehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSavedVehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSavedVehicleAggregateArgs>(args: Subset<T, UserSavedVehicleAggregateArgs>): Prisma.PrismaPromise<GetUserSavedVehicleAggregateType<T>>

    /**
     * Group by UserSavedVehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSavedVehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSavedVehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSavedVehicleGroupByArgs['orderBy'] }
        : { orderBy?: UserSavedVehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSavedVehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSavedVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSavedVehicle model
   */
  readonly fields: UserSavedVehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSavedVehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSavedVehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSavedVehicle model
   */ 
  interface UserSavedVehicleFieldRefs {
    readonly id: FieldRef<"UserSavedVehicle", 'String'>
    readonly userId: FieldRef<"UserSavedVehicle", 'String'>
    readonly vehicleId: FieldRef<"UserSavedVehicle", 'String'>
    readonly savedAt: FieldRef<"UserSavedVehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSavedVehicle findUnique
   */
  export type UserSavedVehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserSavedVehicle to fetch.
     */
    where: UserSavedVehicleWhereUniqueInput
  }

  /**
   * UserSavedVehicle findUniqueOrThrow
   */
  export type UserSavedVehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserSavedVehicle to fetch.
     */
    where: UserSavedVehicleWhereUniqueInput
  }

  /**
   * UserSavedVehicle findFirst
   */
  export type UserSavedVehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserSavedVehicle to fetch.
     */
    where?: UserSavedVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSavedVehicles to fetch.
     */
    orderBy?: UserSavedVehicleOrderByWithRelationInput | UserSavedVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSavedVehicles.
     */
    cursor?: UserSavedVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSavedVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSavedVehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSavedVehicles.
     */
    distinct?: UserSavedVehicleScalarFieldEnum | UserSavedVehicleScalarFieldEnum[]
  }

  /**
   * UserSavedVehicle findFirstOrThrow
   */
  export type UserSavedVehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserSavedVehicle to fetch.
     */
    where?: UserSavedVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSavedVehicles to fetch.
     */
    orderBy?: UserSavedVehicleOrderByWithRelationInput | UserSavedVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSavedVehicles.
     */
    cursor?: UserSavedVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSavedVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSavedVehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSavedVehicles.
     */
    distinct?: UserSavedVehicleScalarFieldEnum | UserSavedVehicleScalarFieldEnum[]
  }

  /**
   * UserSavedVehicle findMany
   */
  export type UserSavedVehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserSavedVehicles to fetch.
     */
    where?: UserSavedVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSavedVehicles to fetch.
     */
    orderBy?: UserSavedVehicleOrderByWithRelationInput | UserSavedVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSavedVehicles.
     */
    cursor?: UserSavedVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSavedVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSavedVehicles.
     */
    skip?: number
    distinct?: UserSavedVehicleScalarFieldEnum | UserSavedVehicleScalarFieldEnum[]
  }

  /**
   * UserSavedVehicle create
   */
  export type UserSavedVehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSavedVehicle.
     */
    data: XOR<UserSavedVehicleCreateInput, UserSavedVehicleUncheckedCreateInput>
  }

  /**
   * UserSavedVehicle createMany
   */
  export type UserSavedVehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSavedVehicles.
     */
    data: UserSavedVehicleCreateManyInput | UserSavedVehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSavedVehicle createManyAndReturn
   */
  export type UserSavedVehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * The data used to create many UserSavedVehicles.
     */
    data: UserSavedVehicleCreateManyInput | UserSavedVehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSavedVehicle update
   */
  export type UserSavedVehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSavedVehicle.
     */
    data: XOR<UserSavedVehicleUpdateInput, UserSavedVehicleUncheckedUpdateInput>
    /**
     * Choose, which UserSavedVehicle to update.
     */
    where: UserSavedVehicleWhereUniqueInput
  }

  /**
   * UserSavedVehicle updateMany
   */
  export type UserSavedVehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSavedVehicles.
     */
    data: XOR<UserSavedVehicleUpdateManyMutationInput, UserSavedVehicleUncheckedUpdateManyInput>
    /**
     * Filter which UserSavedVehicles to update
     */
    where?: UserSavedVehicleWhereInput
    /**
     * Limit how many UserSavedVehicles to update.
     */
    limit?: number
  }

  /**
   * UserSavedVehicle updateManyAndReturn
   */
  export type UserSavedVehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * The data used to update UserSavedVehicles.
     */
    data: XOR<UserSavedVehicleUpdateManyMutationInput, UserSavedVehicleUncheckedUpdateManyInput>
    /**
     * Filter which UserSavedVehicles to update
     */
    where?: UserSavedVehicleWhereInput
    /**
     * Limit how many UserSavedVehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSavedVehicle upsert
   */
  export type UserSavedVehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSavedVehicle to update in case it exists.
     */
    where: UserSavedVehicleWhereUniqueInput
    /**
     * In case the UserSavedVehicle found by the `where` argument doesn't exist, create a new UserSavedVehicle with this data.
     */
    create: XOR<UserSavedVehicleCreateInput, UserSavedVehicleUncheckedCreateInput>
    /**
     * In case the UserSavedVehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSavedVehicleUpdateInput, UserSavedVehicleUncheckedUpdateInput>
  }

  /**
   * UserSavedVehicle delete
   */
  export type UserSavedVehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    /**
     * Filter which UserSavedVehicle to delete.
     */
    where: UserSavedVehicleWhereUniqueInput
  }

  /**
   * UserSavedVehicle deleteMany
   */
  export type UserSavedVehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSavedVehicles to delete
     */
    where?: UserSavedVehicleWhereInput
    /**
     * Limit how many UserSavedVehicles to delete.
     */
    limit?: number
  }

  /**
   * UserSavedVehicle without action
   */
  export type UserSavedVehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    year: number | null
    price: Decimal | null
    seats: number | null
    doors: number | null
    mileage: number | null
  }

  export type VehicleSumAggregateOutputType = {
    year: number | null
    price: Decimal | null
    seats: number | null
    doors: number | null
    mileage: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    category: string | null
    model: string | null
    year: number | null
    price: Decimal | null
    color: string | null
    featured: boolean | null
    seats: number | null
    doors: number | null
    engineSize: string | null
    mileage: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    status: string | null
    fuelType: string | null
    transmission: string | null
    vehicleBrand: string | null
    vehicleType: string | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    category: string | null
    model: string | null
    year: number | null
    price: Decimal | null
    color: string | null
    featured: boolean | null
    seats: number | null
    doors: number | null
    engineSize: string | null
    mileage: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    status: string | null
    fuelType: string | null
    transmission: string | null
    vehicleBrand: string | null
    vehicleType: string | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    category: number
    model: number
    year: number
    price: number
    color: number
    featured: number
    seats: number
    doors: number
    engineSize: number
    mileage: number
    description: number
    images: number
    optionals: number
    createdAt: number
    updatedAt: number
    status: number
    fuelType: number
    transmission: number
    vehicleBrand: number
    vehicleType: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    year?: true
    price?: true
    seats?: true
    doors?: true
    mileage?: true
  }

  export type VehicleSumAggregateInputType = {
    year?: true
    price?: true
    seats?: true
    doors?: true
    mileage?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    category?: true
    model?: true
    year?: true
    price?: true
    color?: true
    featured?: true
    seats?: true
    doors?: true
    engineSize?: true
    mileage?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    status?: true
    fuelType?: true
    transmission?: true
    vehicleBrand?: true
    vehicleType?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    category?: true
    model?: true
    year?: true
    price?: true
    color?: true
    featured?: true
    seats?: true
    doors?: true
    engineSize?: true
    mileage?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    status?: true
    fuelType?: true
    transmission?: true
    vehicleBrand?: true
    vehicleType?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    category?: true
    model?: true
    year?: true
    price?: true
    color?: true
    featured?: true
    seats?: true
    doors?: true
    engineSize?: true
    mileage?: true
    description?: true
    images?: true
    optionals?: true
    createdAt?: true
    updatedAt?: true
    status?: true
    fuelType?: true
    transmission?: true
    vehicleBrand?: true
    vehicleType?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    category: string
    model: string
    year: number
    price: Decimal
    color: string
    featured: boolean
    seats: number | null
    doors: number | null
    engineSize: string | null
    mileage: number
    description: string | null
    images: string[]
    optionals: string[]
    createdAt: Date
    updatedAt: Date
    status: string
    fuelType: string
    transmission: string
    vehicleBrand: string | null
    vehicleType: string | null
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    color?: boolean
    featured?: boolean
    seats?: boolean
    doors?: boolean
    engineSize?: boolean
    mileage?: boolean
    description?: boolean
    images?: boolean
    optionals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    fuelType?: boolean
    transmission?: boolean
    vehicleBrand?: boolean
    vehicleType?: boolean
    savedBy?: boolean | Vehicle$savedByArgs<ExtArgs>
    visits?: boolean | Vehicle$visitsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    color?: boolean
    featured?: boolean
    seats?: boolean
    doors?: boolean
    engineSize?: boolean
    mileage?: boolean
    description?: boolean
    images?: boolean
    optionals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    fuelType?: boolean
    transmission?: boolean
    vehicleBrand?: boolean
    vehicleType?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    color?: boolean
    featured?: boolean
    seats?: boolean
    doors?: boolean
    engineSize?: boolean
    mileage?: boolean
    description?: boolean
    images?: boolean
    optionals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    fuelType?: boolean
    transmission?: boolean
    vehicleBrand?: boolean
    vehicleType?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    category?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    color?: boolean
    featured?: boolean
    seats?: boolean
    doors?: boolean
    engineSize?: boolean
    mileage?: boolean
    description?: boolean
    images?: boolean
    optionals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    fuelType?: boolean
    transmission?: boolean
    vehicleBrand?: boolean
    vehicleType?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category" | "model" | "year" | "price" | "color" | "featured" | "seats" | "doors" | "engineSize" | "mileage" | "description" | "images" | "optionals" | "createdAt" | "updatedAt" | "status" | "fuelType" | "transmission" | "vehicleBrand" | "vehicleType", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    savedBy?: boolean | Vehicle$savedByArgs<ExtArgs>
    visits?: boolean | Vehicle$visitsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      savedBy: Prisma.$UserSavedVehiclePayload<ExtArgs>[]
      visits: Prisma.$VisitBookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: string
      model: string
      year: number
      price: Prisma.Decimal
      color: string
      featured: boolean
      seats: number | null
      doors: number | null
      engineSize: string | null
      mileage: number
      description: string | null
      images: string[]
      optionals: string[]
      createdAt: Date
      updatedAt: Date
      status: string
      fuelType: string
      transmission: string
      vehicleBrand: string | null
      vehicleType: string | null
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    savedBy<T extends Vehicle$savedByArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$savedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSavedVehiclePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    visits<T extends Vehicle$visitsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */ 
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly category: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly price: FieldRef<"Vehicle", 'Decimal'>
    readonly color: FieldRef<"Vehicle", 'String'>
    readonly featured: FieldRef<"Vehicle", 'Boolean'>
    readonly seats: FieldRef<"Vehicle", 'Int'>
    readonly doors: FieldRef<"Vehicle", 'Int'>
    readonly engineSize: FieldRef<"Vehicle", 'String'>
    readonly mileage: FieldRef<"Vehicle", 'Int'>
    readonly description: FieldRef<"Vehicle", 'String'>
    readonly images: FieldRef<"Vehicle", 'String[]'>
    readonly optionals: FieldRef<"Vehicle", 'String[]'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
    readonly status: FieldRef<"Vehicle", 'String'>
    readonly fuelType: FieldRef<"Vehicle", 'String'>
    readonly transmission: FieldRef<"Vehicle", 'String'>
    readonly vehicleBrand: FieldRef<"Vehicle", 'String'>
    readonly vehicleType: FieldRef<"Vehicle", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.savedBy
   */
  export type Vehicle$savedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSavedVehicle
     */
    select?: UserSavedVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSavedVehicle
     */
    omit?: UserSavedVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSavedVehicleInclude<ExtArgs> | null
    where?: UserSavedVehicleWhereInput
    orderBy?: UserSavedVehicleOrderByWithRelationInput | UserSavedVehicleOrderByWithRelationInput[]
    cursor?: UserSavedVehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSavedVehicleScalarFieldEnum | UserSavedVehicleScalarFieldEnum[]
  }

  /**
   * Vehicle.visits
   */
  export type Vehicle$visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    where?: VisitBookingWhereInput
    orderBy?: VisitBookingOrderByWithRelationInput | VisitBookingOrderByWithRelationInput[]
    cursor?: VisitBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitBookingScalarFieldEnum | VisitBookingScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model VisitBooking
   */

  export type AggregateVisitBooking = {
    _count: VisitBookingCountAggregateOutputType | null
    _min: VisitBookingMinAggregateOutputType | null
    _max: VisitBookingMaxAggregateOutputType | null
  }

  export type VisitBookingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    dealershipInfoId: string | null
    visitDate: Date | null
    startTime: string | null
    endTime: string | null
    status: $Enums.BookingStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    vehicleId: string | null
  }

  export type VisitBookingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dealershipInfoId: string | null
    visitDate: Date | null
    startTime: string | null
    endTime: string | null
    status: $Enums.BookingStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    vehicleId: string | null
  }

  export type VisitBookingCountAggregateOutputType = {
    id: number
    userId: number
    dealershipInfoId: number
    visitDate: number
    startTime: number
    endTime: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    vehicleId: number
    _all: number
  }


  export type VisitBookingMinAggregateInputType = {
    id?: true
    userId?: true
    dealershipInfoId?: true
    visitDate?: true
    startTime?: true
    endTime?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    vehicleId?: true
  }

  export type VisitBookingMaxAggregateInputType = {
    id?: true
    userId?: true
    dealershipInfoId?: true
    visitDate?: true
    startTime?: true
    endTime?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    vehicleId?: true
  }

  export type VisitBookingCountAggregateInputType = {
    id?: true
    userId?: true
    dealershipInfoId?: true
    visitDate?: true
    startTime?: true
    endTime?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    vehicleId?: true
    _all?: true
  }

  export type VisitBookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VisitBooking to aggregate.
     */
    where?: VisitBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitBookings to fetch.
     */
    orderBy?: VisitBookingOrderByWithRelationInput | VisitBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VisitBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VisitBookings
    **/
    _count?: true | VisitBookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VisitBookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VisitBookingMaxAggregateInputType
  }

  export type GetVisitBookingAggregateType<T extends VisitBookingAggregateArgs> = {
        [P in keyof T & keyof AggregateVisitBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisitBooking[P]>
      : GetScalarType<T[P], AggregateVisitBooking[P]>
  }




  export type VisitBookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitBookingWhereInput
    orderBy?: VisitBookingOrderByWithAggregationInput | VisitBookingOrderByWithAggregationInput[]
    by: VisitBookingScalarFieldEnum[] | VisitBookingScalarFieldEnum
    having?: VisitBookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VisitBookingCountAggregateInputType | true
    _min?: VisitBookingMinAggregateInputType
    _max?: VisitBookingMaxAggregateInputType
  }

  export type VisitBookingGroupByOutputType = {
    id: string
    userId: string
    dealershipInfoId: string
    visitDate: Date
    startTime: string
    endTime: string
    status: $Enums.BookingStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
    vehicleId: string | null
    _count: VisitBookingCountAggregateOutputType | null
    _min: VisitBookingMinAggregateOutputType | null
    _max: VisitBookingMaxAggregateOutputType | null
  }

  type GetVisitBookingGroupByPayload<T extends VisitBookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VisitBookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VisitBookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VisitBookingGroupByOutputType[P]>
            : GetScalarType<T[P], VisitBookingGroupByOutputType[P]>
        }
      >
    >


  export type VisitBookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dealershipInfoId?: boolean
    visitDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicleId?: boolean
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Vehicle?: boolean | VisitBooking$VehicleArgs<ExtArgs>
  }, ExtArgs["result"]["visitBooking"]>

  export type VisitBookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dealershipInfoId?: boolean
    visitDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicleId?: boolean
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Vehicle?: boolean | VisitBooking$VehicleArgs<ExtArgs>
  }, ExtArgs["result"]["visitBooking"]>

  export type VisitBookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dealershipInfoId?: boolean
    visitDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicleId?: boolean
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Vehicle?: boolean | VisitBooking$VehicleArgs<ExtArgs>
  }, ExtArgs["result"]["visitBooking"]>

  export type VisitBookingSelectScalar = {
    id?: boolean
    userId?: boolean
    dealershipInfoId?: boolean
    visitDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicleId?: boolean
  }

  export type VisitBookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "dealershipInfoId" | "visitDate" | "startTime" | "endTime" | "status" | "notes" | "createdAt" | "updatedAt" | "vehicleId", ExtArgs["result"]["visitBooking"]>
  export type VisitBookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Vehicle?: boolean | VisitBooking$VehicleArgs<ExtArgs>
  }
  export type VisitBookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Vehicle?: boolean | VisitBooking$VehicleArgs<ExtArgs>
  }
  export type VisitBookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Vehicle?: boolean | VisitBooking$VehicleArgs<ExtArgs>
  }

  export type $VisitBookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VisitBooking"
    objects: {
      dealershipInfo: Prisma.$DealershipInfoPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      Vehicle: Prisma.$VehiclePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      dealershipInfoId: string
      visitDate: Date
      startTime: string
      endTime: string
      status: $Enums.BookingStatus
      notes: string | null
      createdAt: Date
      updatedAt: Date
      vehicleId: string | null
    }, ExtArgs["result"]["visitBooking"]>
    composites: {}
  }

  type VisitBookingGetPayload<S extends boolean | null | undefined | VisitBookingDefaultArgs> = $Result.GetResult<Prisma.$VisitBookingPayload, S>

  type VisitBookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VisitBookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VisitBookingCountAggregateInputType | true
    }

  export interface VisitBookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VisitBooking'], meta: { name: 'VisitBooking' } }
    /**
     * Find zero or one VisitBooking that matches the filter.
     * @param {VisitBookingFindUniqueArgs} args - Arguments to find a VisitBooking
     * @example
     * // Get one VisitBooking
     * const visitBooking = await prisma.visitBooking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisitBookingFindUniqueArgs>(args: SelectSubset<T, VisitBookingFindUniqueArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one VisitBooking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VisitBookingFindUniqueOrThrowArgs} args - Arguments to find a VisitBooking
     * @example
     * // Get one VisitBooking
     * const visitBooking = await prisma.visitBooking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisitBookingFindUniqueOrThrowArgs>(args: SelectSubset<T, VisitBookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first VisitBooking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitBookingFindFirstArgs} args - Arguments to find a VisitBooking
     * @example
     * // Get one VisitBooking
     * const visitBooking = await prisma.visitBooking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisitBookingFindFirstArgs>(args?: SelectSubset<T, VisitBookingFindFirstArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first VisitBooking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitBookingFindFirstOrThrowArgs} args - Arguments to find a VisitBooking
     * @example
     * // Get one VisitBooking
     * const visitBooking = await prisma.visitBooking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisitBookingFindFirstOrThrowArgs>(args?: SelectSubset<T, VisitBookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more VisitBookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitBookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VisitBookings
     * const visitBookings = await prisma.visitBooking.findMany()
     * 
     * // Get first 10 VisitBookings
     * const visitBookings = await prisma.visitBooking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitBookingWithIdOnly = await prisma.visitBooking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VisitBookingFindManyArgs>(args?: SelectSubset<T, VisitBookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a VisitBooking.
     * @param {VisitBookingCreateArgs} args - Arguments to create a VisitBooking.
     * @example
     * // Create one VisitBooking
     * const VisitBooking = await prisma.visitBooking.create({
     *   data: {
     *     // ... data to create a VisitBooking
     *   }
     * })
     * 
     */
    create<T extends VisitBookingCreateArgs>(args: SelectSubset<T, VisitBookingCreateArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many VisitBookings.
     * @param {VisitBookingCreateManyArgs} args - Arguments to create many VisitBookings.
     * @example
     * // Create many VisitBookings
     * const visitBooking = await prisma.visitBooking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VisitBookingCreateManyArgs>(args?: SelectSubset<T, VisitBookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VisitBookings and returns the data saved in the database.
     * @param {VisitBookingCreateManyAndReturnArgs} args - Arguments to create many VisitBookings.
     * @example
     * // Create many VisitBookings
     * const visitBooking = await prisma.visitBooking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VisitBookings and only return the `id`
     * const visitBookingWithIdOnly = await prisma.visitBooking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VisitBookingCreateManyAndReturnArgs>(args?: SelectSubset<T, VisitBookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a VisitBooking.
     * @param {VisitBookingDeleteArgs} args - Arguments to delete one VisitBooking.
     * @example
     * // Delete one VisitBooking
     * const VisitBooking = await prisma.visitBooking.delete({
     *   where: {
     *     // ... filter to delete one VisitBooking
     *   }
     * })
     * 
     */
    delete<T extends VisitBookingDeleteArgs>(args: SelectSubset<T, VisitBookingDeleteArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one VisitBooking.
     * @param {VisitBookingUpdateArgs} args - Arguments to update one VisitBooking.
     * @example
     * // Update one VisitBooking
     * const visitBooking = await prisma.visitBooking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VisitBookingUpdateArgs>(args: SelectSubset<T, VisitBookingUpdateArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more VisitBookings.
     * @param {VisitBookingDeleteManyArgs} args - Arguments to filter VisitBookings to delete.
     * @example
     * // Delete a few VisitBookings
     * const { count } = await prisma.visitBooking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VisitBookingDeleteManyArgs>(args?: SelectSubset<T, VisitBookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VisitBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitBookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VisitBookings
     * const visitBooking = await prisma.visitBooking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VisitBookingUpdateManyArgs>(args: SelectSubset<T, VisitBookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VisitBookings and returns the data updated in the database.
     * @param {VisitBookingUpdateManyAndReturnArgs} args - Arguments to update many VisitBookings.
     * @example
     * // Update many VisitBookings
     * const visitBooking = await prisma.visitBooking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VisitBookings and only return the `id`
     * const visitBookingWithIdOnly = await prisma.visitBooking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VisitBookingUpdateManyAndReturnArgs>(args: SelectSubset<T, VisitBookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one VisitBooking.
     * @param {VisitBookingUpsertArgs} args - Arguments to update or create a VisitBooking.
     * @example
     * // Update or create a VisitBooking
     * const visitBooking = await prisma.visitBooking.upsert({
     *   create: {
     *     // ... data to create a VisitBooking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VisitBooking we want to update
     *   }
     * })
     */
    upsert<T extends VisitBookingUpsertArgs>(args: SelectSubset<T, VisitBookingUpsertArgs<ExtArgs>>): Prisma__VisitBookingClient<$Result.GetResult<Prisma.$VisitBookingPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of VisitBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitBookingCountArgs} args - Arguments to filter VisitBookings to count.
     * @example
     * // Count the number of VisitBookings
     * const count = await prisma.visitBooking.count({
     *   where: {
     *     // ... the filter for the VisitBookings we want to count
     *   }
     * })
    **/
    count<T extends VisitBookingCountArgs>(
      args?: Subset<T, VisitBookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VisitBookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VisitBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitBookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VisitBookingAggregateArgs>(args: Subset<T, VisitBookingAggregateArgs>): Prisma.PrismaPromise<GetVisitBookingAggregateType<T>>

    /**
     * Group by VisitBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitBookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VisitBookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VisitBookingGroupByArgs['orderBy'] }
        : { orderBy?: VisitBookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VisitBookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VisitBooking model
   */
  readonly fields: VisitBookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VisitBooking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VisitBookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dealershipInfo<T extends DealershipInfoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DealershipInfoDefaultArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    Vehicle<T extends VisitBooking$VehicleArgs<ExtArgs> = {}>(args?: Subset<T, VisitBooking$VehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VisitBooking model
   */ 
  interface VisitBookingFieldRefs {
    readonly id: FieldRef<"VisitBooking", 'String'>
    readonly userId: FieldRef<"VisitBooking", 'String'>
    readonly dealershipInfoId: FieldRef<"VisitBooking", 'String'>
    readonly visitDate: FieldRef<"VisitBooking", 'DateTime'>
    readonly startTime: FieldRef<"VisitBooking", 'String'>
    readonly endTime: FieldRef<"VisitBooking", 'String'>
    readonly status: FieldRef<"VisitBooking", 'BookingStatus'>
    readonly notes: FieldRef<"VisitBooking", 'String'>
    readonly createdAt: FieldRef<"VisitBooking", 'DateTime'>
    readonly updatedAt: FieldRef<"VisitBooking", 'DateTime'>
    readonly vehicleId: FieldRef<"VisitBooking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VisitBooking findUnique
   */
  export type VisitBookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * Filter, which VisitBooking to fetch.
     */
    where: VisitBookingWhereUniqueInput
  }

  /**
   * VisitBooking findUniqueOrThrow
   */
  export type VisitBookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * Filter, which VisitBooking to fetch.
     */
    where: VisitBookingWhereUniqueInput
  }

  /**
   * VisitBooking findFirst
   */
  export type VisitBookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * Filter, which VisitBooking to fetch.
     */
    where?: VisitBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitBookings to fetch.
     */
    orderBy?: VisitBookingOrderByWithRelationInput | VisitBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VisitBookings.
     */
    cursor?: VisitBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VisitBookings.
     */
    distinct?: VisitBookingScalarFieldEnum | VisitBookingScalarFieldEnum[]
  }

  /**
   * VisitBooking findFirstOrThrow
   */
  export type VisitBookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * Filter, which VisitBooking to fetch.
     */
    where?: VisitBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitBookings to fetch.
     */
    orderBy?: VisitBookingOrderByWithRelationInput | VisitBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VisitBookings.
     */
    cursor?: VisitBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VisitBookings.
     */
    distinct?: VisitBookingScalarFieldEnum | VisitBookingScalarFieldEnum[]
  }

  /**
   * VisitBooking findMany
   */
  export type VisitBookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * Filter, which VisitBookings to fetch.
     */
    where?: VisitBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitBookings to fetch.
     */
    orderBy?: VisitBookingOrderByWithRelationInput | VisitBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VisitBookings.
     */
    cursor?: VisitBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitBookings.
     */
    skip?: number
    distinct?: VisitBookingScalarFieldEnum | VisitBookingScalarFieldEnum[]
  }

  /**
   * VisitBooking create
   */
  export type VisitBookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * The data needed to create a VisitBooking.
     */
    data: XOR<VisitBookingCreateInput, VisitBookingUncheckedCreateInput>
  }

  /**
   * VisitBooking createMany
   */
  export type VisitBookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VisitBookings.
     */
    data: VisitBookingCreateManyInput | VisitBookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VisitBooking createManyAndReturn
   */
  export type VisitBookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * The data used to create many VisitBookings.
     */
    data: VisitBookingCreateManyInput | VisitBookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VisitBooking update
   */
  export type VisitBookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * The data needed to update a VisitBooking.
     */
    data: XOR<VisitBookingUpdateInput, VisitBookingUncheckedUpdateInput>
    /**
     * Choose, which VisitBooking to update.
     */
    where: VisitBookingWhereUniqueInput
  }

  /**
   * VisitBooking updateMany
   */
  export type VisitBookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VisitBookings.
     */
    data: XOR<VisitBookingUpdateManyMutationInput, VisitBookingUncheckedUpdateManyInput>
    /**
     * Filter which VisitBookings to update
     */
    where?: VisitBookingWhereInput
    /**
     * Limit how many VisitBookings to update.
     */
    limit?: number
  }

  /**
   * VisitBooking updateManyAndReturn
   */
  export type VisitBookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * The data used to update VisitBookings.
     */
    data: XOR<VisitBookingUpdateManyMutationInput, VisitBookingUncheckedUpdateManyInput>
    /**
     * Filter which VisitBookings to update
     */
    where?: VisitBookingWhereInput
    /**
     * Limit how many VisitBookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VisitBooking upsert
   */
  export type VisitBookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * The filter to search for the VisitBooking to update in case it exists.
     */
    where: VisitBookingWhereUniqueInput
    /**
     * In case the VisitBooking found by the `where` argument doesn't exist, create a new VisitBooking with this data.
     */
    create: XOR<VisitBookingCreateInput, VisitBookingUncheckedCreateInput>
    /**
     * In case the VisitBooking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VisitBookingUpdateInput, VisitBookingUncheckedUpdateInput>
  }

  /**
   * VisitBooking delete
   */
  export type VisitBookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
    /**
     * Filter which VisitBooking to delete.
     */
    where: VisitBookingWhereUniqueInput
  }

  /**
   * VisitBooking deleteMany
   */
  export type VisitBookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VisitBookings to delete
     */
    where?: VisitBookingWhereInput
    /**
     * Limit how many VisitBookings to delete.
     */
    limit?: number
  }

  /**
   * VisitBooking.Vehicle
   */
  export type VisitBooking$VehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * VisitBooking without action
   */
  export type VisitBookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitBooking
     */
    select?: VisitBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VisitBooking
     */
    omit?: VisitBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitBookingInclude<ExtArgs> | null
  }


  /**
   * Model WorkingHour
   */

  export type AggregateWorkingHour = {
    _count: WorkingHourCountAggregateOutputType | null
    _min: WorkingHourMinAggregateOutputType | null
    _max: WorkingHourMaxAggregateOutputType | null
  }

  export type WorkingHourMinAggregateOutputType = {
    id: string | null
    dealershipInfoId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    isOpen: boolean | null
    openTime: string | null
    closeTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkingHourMaxAggregateOutputType = {
    id: string | null
    dealershipInfoId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    isOpen: boolean | null
    openTime: string | null
    closeTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkingHourCountAggregateOutputType = {
    id: number
    dealershipInfoId: number
    dayOfWeek: number
    isOpen: number
    openTime: number
    closeTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkingHourMinAggregateInputType = {
    id?: true
    dealershipInfoId?: true
    dayOfWeek?: true
    isOpen?: true
    openTime?: true
    closeTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkingHourMaxAggregateInputType = {
    id?: true
    dealershipInfoId?: true
    dayOfWeek?: true
    isOpen?: true
    openTime?: true
    closeTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkingHourCountAggregateInputType = {
    id?: true
    dealershipInfoId?: true
    dayOfWeek?: true
    isOpen?: true
    openTime?: true
    closeTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkingHourAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkingHour to aggregate.
     */
    where?: WorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHourOrderByWithRelationInput | WorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkingHours
    **/
    _count?: true | WorkingHourCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkingHourMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkingHourMaxAggregateInputType
  }

  export type GetWorkingHourAggregateType<T extends WorkingHourAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkingHour]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkingHour[P]>
      : GetScalarType<T[P], AggregateWorkingHour[P]>
  }




  export type WorkingHourGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkingHourWhereInput
    orderBy?: WorkingHourOrderByWithAggregationInput | WorkingHourOrderByWithAggregationInput[]
    by: WorkingHourScalarFieldEnum[] | WorkingHourScalarFieldEnum
    having?: WorkingHourScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkingHourCountAggregateInputType | true
    _min?: WorkingHourMinAggregateInputType
    _max?: WorkingHourMaxAggregateInputType
  }

  export type WorkingHourGroupByOutputType = {
    id: string
    dealershipInfoId: string
    dayOfWeek: $Enums.DayOfWeek
    isOpen: boolean
    openTime: string
    closeTime: string
    createdAt: Date
    updatedAt: Date
    _count: WorkingHourCountAggregateOutputType | null
    _min: WorkingHourMinAggregateOutputType | null
    _max: WorkingHourMaxAggregateOutputType | null
  }

  type GetWorkingHourGroupByPayload<T extends WorkingHourGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkingHourGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkingHourGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkingHourGroupByOutputType[P]>
            : GetScalarType<T[P], WorkingHourGroupByOutputType[P]>
        }
      >
    >


  export type WorkingHourSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealershipInfoId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    openTime?: boolean
    closeTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workingHour"]>

  export type WorkingHourSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealershipInfoId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    openTime?: boolean
    closeTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workingHour"]>

  export type WorkingHourSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealershipInfoId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    openTime?: boolean
    closeTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workingHour"]>

  export type WorkingHourSelectScalar = {
    id?: boolean
    dealershipInfoId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    openTime?: boolean
    closeTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkingHourOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dealershipInfoId" | "dayOfWeek" | "isOpen" | "openTime" | "closeTime" | "createdAt" | "updatedAt", ExtArgs["result"]["workingHour"]>
  export type WorkingHourInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
  }
  export type WorkingHourIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
  }
  export type WorkingHourIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dealershipInfo?: boolean | DealershipInfoDefaultArgs<ExtArgs>
  }

  export type $WorkingHourPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkingHour"
    objects: {
      dealershipInfo: Prisma.$DealershipInfoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dealershipInfoId: string
      dayOfWeek: $Enums.DayOfWeek
      isOpen: boolean
      openTime: string
      closeTime: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workingHour"]>
    composites: {}
  }

  type WorkingHourGetPayload<S extends boolean | null | undefined | WorkingHourDefaultArgs> = $Result.GetResult<Prisma.$WorkingHourPayload, S>

  type WorkingHourCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkingHourFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkingHourCountAggregateInputType | true
    }

  export interface WorkingHourDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkingHour'], meta: { name: 'WorkingHour' } }
    /**
     * Find zero or one WorkingHour that matches the filter.
     * @param {WorkingHourFindUniqueArgs} args - Arguments to find a WorkingHour
     * @example
     * // Get one WorkingHour
     * const workingHour = await prisma.workingHour.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkingHourFindUniqueArgs>(args: SelectSubset<T, WorkingHourFindUniqueArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one WorkingHour that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkingHourFindUniqueOrThrowArgs} args - Arguments to find a WorkingHour
     * @example
     * // Get one WorkingHour
     * const workingHour = await prisma.workingHour.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkingHourFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkingHourFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first WorkingHour that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHourFindFirstArgs} args - Arguments to find a WorkingHour
     * @example
     * // Get one WorkingHour
     * const workingHour = await prisma.workingHour.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkingHourFindFirstArgs>(args?: SelectSubset<T, WorkingHourFindFirstArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first WorkingHour that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHourFindFirstOrThrowArgs} args - Arguments to find a WorkingHour
     * @example
     * // Get one WorkingHour
     * const workingHour = await prisma.workingHour.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkingHourFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkingHourFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more WorkingHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHourFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkingHours
     * const workingHours = await prisma.workingHour.findMany()
     * 
     * // Get first 10 WorkingHours
     * const workingHours = await prisma.workingHour.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workingHourWithIdOnly = await prisma.workingHour.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkingHourFindManyArgs>(args?: SelectSubset<T, WorkingHourFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a WorkingHour.
     * @param {WorkingHourCreateArgs} args - Arguments to create a WorkingHour.
     * @example
     * // Create one WorkingHour
     * const WorkingHour = await prisma.workingHour.create({
     *   data: {
     *     // ... data to create a WorkingHour
     *   }
     * })
     * 
     */
    create<T extends WorkingHourCreateArgs>(args: SelectSubset<T, WorkingHourCreateArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many WorkingHours.
     * @param {WorkingHourCreateManyArgs} args - Arguments to create many WorkingHours.
     * @example
     * // Create many WorkingHours
     * const workingHour = await prisma.workingHour.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkingHourCreateManyArgs>(args?: SelectSubset<T, WorkingHourCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkingHours and returns the data saved in the database.
     * @param {WorkingHourCreateManyAndReturnArgs} args - Arguments to create many WorkingHours.
     * @example
     * // Create many WorkingHours
     * const workingHour = await prisma.workingHour.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkingHours and only return the `id`
     * const workingHourWithIdOnly = await prisma.workingHour.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkingHourCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkingHourCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a WorkingHour.
     * @param {WorkingHourDeleteArgs} args - Arguments to delete one WorkingHour.
     * @example
     * // Delete one WorkingHour
     * const WorkingHour = await prisma.workingHour.delete({
     *   where: {
     *     // ... filter to delete one WorkingHour
     *   }
     * })
     * 
     */
    delete<T extends WorkingHourDeleteArgs>(args: SelectSubset<T, WorkingHourDeleteArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one WorkingHour.
     * @param {WorkingHourUpdateArgs} args - Arguments to update one WorkingHour.
     * @example
     * // Update one WorkingHour
     * const workingHour = await prisma.workingHour.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkingHourUpdateArgs>(args: SelectSubset<T, WorkingHourUpdateArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more WorkingHours.
     * @param {WorkingHourDeleteManyArgs} args - Arguments to filter WorkingHours to delete.
     * @example
     * // Delete a few WorkingHours
     * const { count } = await prisma.workingHour.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkingHourDeleteManyArgs>(args?: SelectSubset<T, WorkingHourDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHourUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkingHours
     * const workingHour = await prisma.workingHour.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkingHourUpdateManyArgs>(args: SelectSubset<T, WorkingHourUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkingHours and returns the data updated in the database.
     * @param {WorkingHourUpdateManyAndReturnArgs} args - Arguments to update many WorkingHours.
     * @example
     * // Update many WorkingHours
     * const workingHour = await prisma.workingHour.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkingHours and only return the `id`
     * const workingHourWithIdOnly = await prisma.workingHour.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkingHourUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkingHourUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one WorkingHour.
     * @param {WorkingHourUpsertArgs} args - Arguments to update or create a WorkingHour.
     * @example
     * // Update or create a WorkingHour
     * const workingHour = await prisma.workingHour.upsert({
     *   create: {
     *     // ... data to create a WorkingHour
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkingHour we want to update
     *   }
     * })
     */
    upsert<T extends WorkingHourUpsertArgs>(args: SelectSubset<T, WorkingHourUpsertArgs<ExtArgs>>): Prisma__WorkingHourClient<$Result.GetResult<Prisma.$WorkingHourPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of WorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHourCountArgs} args - Arguments to filter WorkingHours to count.
     * @example
     * // Count the number of WorkingHours
     * const count = await prisma.workingHour.count({
     *   where: {
     *     // ... the filter for the WorkingHours we want to count
     *   }
     * })
    **/
    count<T extends WorkingHourCountArgs>(
      args?: Subset<T, WorkingHourCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkingHourCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkingHour.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHourAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkingHourAggregateArgs>(args: Subset<T, WorkingHourAggregateArgs>): Prisma.PrismaPromise<GetWorkingHourAggregateType<T>>

    /**
     * Group by WorkingHour.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHourGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkingHourGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkingHourGroupByArgs['orderBy'] }
        : { orderBy?: WorkingHourGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkingHourGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkingHourGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkingHour model
   */
  readonly fields: WorkingHourFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkingHour.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkingHourClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dealershipInfo<T extends DealershipInfoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DealershipInfoDefaultArgs<ExtArgs>>): Prisma__DealershipInfoClient<$Result.GetResult<Prisma.$DealershipInfoPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkingHour model
   */ 
  interface WorkingHourFieldRefs {
    readonly id: FieldRef<"WorkingHour", 'String'>
    readonly dealershipInfoId: FieldRef<"WorkingHour", 'String'>
    readonly dayOfWeek: FieldRef<"WorkingHour", 'DayOfWeek'>
    readonly isOpen: FieldRef<"WorkingHour", 'Boolean'>
    readonly openTime: FieldRef<"WorkingHour", 'String'>
    readonly closeTime: FieldRef<"WorkingHour", 'String'>
    readonly createdAt: FieldRef<"WorkingHour", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkingHour", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkingHour findUnique
   */
  export type WorkingHourFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHour to fetch.
     */
    where: WorkingHourWhereUniqueInput
  }

  /**
   * WorkingHour findUniqueOrThrow
   */
  export type WorkingHourFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHour to fetch.
     */
    where: WorkingHourWhereUniqueInput
  }

  /**
   * WorkingHour findFirst
   */
  export type WorkingHourFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHour to fetch.
     */
    where?: WorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHourOrderByWithRelationInput | WorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkingHours.
     */
    cursor?: WorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkingHours.
     */
    distinct?: WorkingHourScalarFieldEnum | WorkingHourScalarFieldEnum[]
  }

  /**
   * WorkingHour findFirstOrThrow
   */
  export type WorkingHourFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHour to fetch.
     */
    where?: WorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHourOrderByWithRelationInput | WorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkingHours.
     */
    cursor?: WorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkingHours.
     */
    distinct?: WorkingHourScalarFieldEnum | WorkingHourScalarFieldEnum[]
  }

  /**
   * WorkingHour findMany
   */
  export type WorkingHourFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHours to fetch.
     */
    where?: WorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHourOrderByWithRelationInput | WorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkingHours.
     */
    cursor?: WorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    distinct?: WorkingHourScalarFieldEnum | WorkingHourScalarFieldEnum[]
  }

  /**
   * WorkingHour create
   */
  export type WorkingHourCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkingHour.
     */
    data: XOR<WorkingHourCreateInput, WorkingHourUncheckedCreateInput>
  }

  /**
   * WorkingHour createMany
   */
  export type WorkingHourCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkingHours.
     */
    data: WorkingHourCreateManyInput | WorkingHourCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkingHour createManyAndReturn
   */
  export type WorkingHourCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * The data used to create many WorkingHours.
     */
    data: WorkingHourCreateManyInput | WorkingHourCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkingHour update
   */
  export type WorkingHourUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkingHour.
     */
    data: XOR<WorkingHourUpdateInput, WorkingHourUncheckedUpdateInput>
    /**
     * Choose, which WorkingHour to update.
     */
    where: WorkingHourWhereUniqueInput
  }

  /**
   * WorkingHour updateMany
   */
  export type WorkingHourUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkingHours.
     */
    data: XOR<WorkingHourUpdateManyMutationInput, WorkingHourUncheckedUpdateManyInput>
    /**
     * Filter which WorkingHours to update
     */
    where?: WorkingHourWhereInput
    /**
     * Limit how many WorkingHours to update.
     */
    limit?: number
  }

  /**
   * WorkingHour updateManyAndReturn
   */
  export type WorkingHourUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * The data used to update WorkingHours.
     */
    data: XOR<WorkingHourUpdateManyMutationInput, WorkingHourUncheckedUpdateManyInput>
    /**
     * Filter which WorkingHours to update
     */
    where?: WorkingHourWhereInput
    /**
     * Limit how many WorkingHours to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkingHour upsert
   */
  export type WorkingHourUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkingHour to update in case it exists.
     */
    where: WorkingHourWhereUniqueInput
    /**
     * In case the WorkingHour found by the `where` argument doesn't exist, create a new WorkingHour with this data.
     */
    create: XOR<WorkingHourCreateInput, WorkingHourUncheckedCreateInput>
    /**
     * In case the WorkingHour was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkingHourUpdateInput, WorkingHourUncheckedUpdateInput>
  }

  /**
   * WorkingHour delete
   */
  export type WorkingHourDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
    /**
     * Filter which WorkingHour to delete.
     */
    where: WorkingHourWhereUniqueInput
  }

  /**
   * WorkingHour deleteMany
   */
  export type WorkingHourDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkingHours to delete
     */
    where?: WorkingHourWhereInput
    /**
     * Limit how many WorkingHours to delete.
     */
    limit?: number
  }

  /**
   * WorkingHour without action
   */
  export type WorkingHourDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHour
     */
    select?: WorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHour
     */
    omit?: WorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHourInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DealershipInfoScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    email: 'email',
    website: 'website',
    socialMedia: 'socialMedia',
    logoUrl: 'logoUrl',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    workingHourId: 'workingHourId'
  };

  export type DealershipInfoScalarFieldEnum = (typeof DealershipInfoScalarFieldEnum)[keyof typeof DealershipInfoScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkUserId: 'clerkUserId',
    email: 'email',
    name: 'name',
    imageUrl: 'imageUrl',
    phone: 'phone',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserSavedVehicleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    vehicleId: 'vehicleId',
    savedAt: 'savedAt'
  };

  export type UserSavedVehicleScalarFieldEnum = (typeof UserSavedVehicleScalarFieldEnum)[keyof typeof UserSavedVehicleScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    category: 'category',
    model: 'model',
    year: 'year',
    price: 'price',
    color: 'color',
    featured: 'featured',
    seats: 'seats',
    doors: 'doors',
    engineSize: 'engineSize',
    mileage: 'mileage',
    description: 'description',
    images: 'images',
    optionals: 'optionals',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    status: 'status',
    fuelType: 'fuelType',
    transmission: 'transmission',
    vehicleBrand: 'vehicleBrand',
    vehicleType: 'vehicleType'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const VisitBookingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dealershipInfoId: 'dealershipInfoId',
    visitDate: 'visitDate',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    vehicleId: 'vehicleId'
  };

  export type VisitBookingScalarFieldEnum = (typeof VisitBookingScalarFieldEnum)[keyof typeof VisitBookingScalarFieldEnum]


  export const WorkingHourScalarFieldEnum: {
    id: 'id',
    dealershipInfoId: 'dealershipInfoId',
    dayOfWeek: 'dayOfWeek',
    isOpen: 'isOpen',
    openTime: 'openTime',
    closeTime: 'closeTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkingHourScalarFieldEnum = (typeof WorkingHourScalarFieldEnum)[keyof typeof WorkingHourScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DealershipInfoWhereInput = {
    AND?: DealershipInfoWhereInput | DealershipInfoWhereInput[]
    OR?: DealershipInfoWhereInput[]
    NOT?: DealershipInfoWhereInput | DealershipInfoWhereInput[]
    id?: StringFilter<"DealershipInfo"> | string
    name?: StringFilter<"DealershipInfo"> | string
    address?: StringFilter<"DealershipInfo"> | string
    phone?: StringNullableFilter<"DealershipInfo"> | string | null
    email?: StringNullableFilter<"DealershipInfo"> | string | null
    website?: StringNullableFilter<"DealershipInfo"> | string | null
    socialMedia?: StringNullableFilter<"DealershipInfo"> | string | null
    logoUrl?: StringNullableFilter<"DealershipInfo"> | string | null
    description?: StringNullableFilter<"DealershipInfo"> | string | null
    createdAt?: DateTimeFilter<"DealershipInfo"> | Date | string
    updatedAt?: DateTimeFilter<"DealershipInfo"> | Date | string
    workingHourId?: StringFilter<"DealershipInfo"> | string
    visitBookings?: VisitBookingListRelationFilter
    workingHours?: WorkingHourListRelationFilter
  }

  export type DealershipInfoOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    socialMedia?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workingHourId?: SortOrder
    visitBookings?: VisitBookingOrderByRelationAggregateInput
    workingHours?: WorkingHourOrderByRelationAggregateInput
  }

  export type DealershipInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DealershipInfoWhereInput | DealershipInfoWhereInput[]
    OR?: DealershipInfoWhereInput[]
    NOT?: DealershipInfoWhereInput | DealershipInfoWhereInput[]
    name?: StringFilter<"DealershipInfo"> | string
    address?: StringFilter<"DealershipInfo"> | string
    phone?: StringNullableFilter<"DealershipInfo"> | string | null
    email?: StringNullableFilter<"DealershipInfo"> | string | null
    website?: StringNullableFilter<"DealershipInfo"> | string | null
    socialMedia?: StringNullableFilter<"DealershipInfo"> | string | null
    logoUrl?: StringNullableFilter<"DealershipInfo"> | string | null
    description?: StringNullableFilter<"DealershipInfo"> | string | null
    createdAt?: DateTimeFilter<"DealershipInfo"> | Date | string
    updatedAt?: DateTimeFilter<"DealershipInfo"> | Date | string
    workingHourId?: StringFilter<"DealershipInfo"> | string
    visitBookings?: VisitBookingListRelationFilter
    workingHours?: WorkingHourListRelationFilter
  }, "id">

  export type DealershipInfoOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    socialMedia?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workingHourId?: SortOrder
    _count?: DealershipInfoCountOrderByAggregateInput
    _max?: DealershipInfoMaxOrderByAggregateInput
    _min?: DealershipInfoMinOrderByAggregateInput
  }

  export type DealershipInfoScalarWhereWithAggregatesInput = {
    AND?: DealershipInfoScalarWhereWithAggregatesInput | DealershipInfoScalarWhereWithAggregatesInput[]
    OR?: DealershipInfoScalarWhereWithAggregatesInput[]
    NOT?: DealershipInfoScalarWhereWithAggregatesInput | DealershipInfoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DealershipInfo"> | string
    name?: StringWithAggregatesFilter<"DealershipInfo"> | string
    address?: StringWithAggregatesFilter<"DealershipInfo"> | string
    phone?: StringNullableWithAggregatesFilter<"DealershipInfo"> | string | null
    email?: StringNullableWithAggregatesFilter<"DealershipInfo"> | string | null
    website?: StringNullableWithAggregatesFilter<"DealershipInfo"> | string | null
    socialMedia?: StringNullableWithAggregatesFilter<"DealershipInfo"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"DealershipInfo"> | string | null
    description?: StringNullableWithAggregatesFilter<"DealershipInfo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DealershipInfo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DealershipInfo"> | Date | string
    workingHourId?: StringWithAggregatesFilter<"DealershipInfo"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerkUserId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    savedCars?: UserSavedVehicleListRelationFilter
    visitBooking?: VisitBookingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    savedCars?: UserSavedVehicleOrderByRelationAggregateInput
    visitBooking?: VisitBookingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkUserId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    savedCars?: UserSavedVehicleListRelationFilter
    visitBooking?: VisitBookingListRelationFilter
  }, "id" | "clerkUserId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerkUserId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserSavedVehicleWhereInput = {
    AND?: UserSavedVehicleWhereInput | UserSavedVehicleWhereInput[]
    OR?: UserSavedVehicleWhereInput[]
    NOT?: UserSavedVehicleWhereInput | UserSavedVehicleWhereInput[]
    id?: StringFilter<"UserSavedVehicle"> | string
    userId?: StringFilter<"UserSavedVehicle"> | string
    vehicleId?: StringFilter<"UserSavedVehicle"> | string
    savedAt?: DateTimeFilter<"UserSavedVehicle"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type UserSavedVehicleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    savedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type UserSavedVehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_vehicleId?: UserSavedVehicleUserIdVehicleIdCompoundUniqueInput
    AND?: UserSavedVehicleWhereInput | UserSavedVehicleWhereInput[]
    OR?: UserSavedVehicleWhereInput[]
    NOT?: UserSavedVehicleWhereInput | UserSavedVehicleWhereInput[]
    userId?: StringFilter<"UserSavedVehicle"> | string
    vehicleId?: StringFilter<"UserSavedVehicle"> | string
    savedAt?: DateTimeFilter<"UserSavedVehicle"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id" | "userId_vehicleId">

  export type UserSavedVehicleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    savedAt?: SortOrder
    _count?: UserSavedVehicleCountOrderByAggregateInput
    _max?: UserSavedVehicleMaxOrderByAggregateInput
    _min?: UserSavedVehicleMinOrderByAggregateInput
  }

  export type UserSavedVehicleScalarWhereWithAggregatesInput = {
    AND?: UserSavedVehicleScalarWhereWithAggregatesInput | UserSavedVehicleScalarWhereWithAggregatesInput[]
    OR?: UserSavedVehicleScalarWhereWithAggregatesInput[]
    NOT?: UserSavedVehicleScalarWhereWithAggregatesInput | UserSavedVehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSavedVehicle"> | string
    userId?: StringWithAggregatesFilter<"UserSavedVehicle"> | string
    vehicleId?: StringWithAggregatesFilter<"UserSavedVehicle"> | string
    savedAt?: DateTimeWithAggregatesFilter<"UserSavedVehicle"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    category?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    price?: DecimalFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string
    color?: StringFilter<"Vehicle"> | string
    featured?: BoolFilter<"Vehicle"> | boolean
    seats?: IntNullableFilter<"Vehicle"> | number | null
    doors?: IntNullableFilter<"Vehicle"> | number | null
    engineSize?: StringNullableFilter<"Vehicle"> | string | null
    mileage?: IntFilter<"Vehicle"> | number
    description?: StringNullableFilter<"Vehicle"> | string | null
    images?: StringNullableListFilter<"Vehicle">
    optionals?: StringNullableListFilter<"Vehicle">
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    status?: StringFilter<"Vehicle"> | string
    fuelType?: StringFilter<"Vehicle"> | string
    transmission?: StringFilter<"Vehicle"> | string
    vehicleBrand?: StringNullableFilter<"Vehicle"> | string | null
    vehicleType?: StringNullableFilter<"Vehicle"> | string | null
    savedBy?: UserSavedVehicleListRelationFilter
    visits?: VisitBookingListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    color?: SortOrder
    featured?: SortOrder
    seats?: SortOrderInput | SortOrder
    doors?: SortOrderInput | SortOrder
    engineSize?: SortOrderInput | SortOrder
    mileage?: SortOrder
    description?: SortOrderInput | SortOrder
    images?: SortOrder
    optionals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    vehicleBrand?: SortOrderInput | SortOrder
    vehicleType?: SortOrderInput | SortOrder
    savedBy?: UserSavedVehicleOrderByRelationAggregateInput
    visits?: VisitBookingOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    category?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    price?: DecimalFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string
    color?: StringFilter<"Vehicle"> | string
    featured?: BoolFilter<"Vehicle"> | boolean
    seats?: IntNullableFilter<"Vehicle"> | number | null
    doors?: IntNullableFilter<"Vehicle"> | number | null
    engineSize?: StringNullableFilter<"Vehicle"> | string | null
    mileage?: IntFilter<"Vehicle"> | number
    description?: StringNullableFilter<"Vehicle"> | string | null
    images?: StringNullableListFilter<"Vehicle">
    optionals?: StringNullableListFilter<"Vehicle">
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    status?: StringFilter<"Vehicle"> | string
    fuelType?: StringFilter<"Vehicle"> | string
    transmission?: StringFilter<"Vehicle"> | string
    vehicleBrand?: StringNullableFilter<"Vehicle"> | string | null
    vehicleType?: StringNullableFilter<"Vehicle"> | string | null
    savedBy?: UserSavedVehicleListRelationFilter
    visits?: VisitBookingListRelationFilter
  }, "id">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    color?: SortOrder
    featured?: SortOrder
    seats?: SortOrderInput | SortOrder
    doors?: SortOrderInput | SortOrder
    engineSize?: SortOrderInput | SortOrder
    mileage?: SortOrder
    description?: SortOrderInput | SortOrder
    images?: SortOrder
    optionals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    vehicleBrand?: SortOrderInput | SortOrder
    vehicleType?: SortOrderInput | SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    category?: StringWithAggregatesFilter<"Vehicle"> | string
    model?: StringWithAggregatesFilter<"Vehicle"> | string
    year?: IntWithAggregatesFilter<"Vehicle"> | number
    price?: DecimalWithAggregatesFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string
    color?: StringWithAggregatesFilter<"Vehicle"> | string
    featured?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    seats?: IntNullableWithAggregatesFilter<"Vehicle"> | number | null
    doors?: IntNullableWithAggregatesFilter<"Vehicle"> | number | null
    engineSize?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    mileage?: IntWithAggregatesFilter<"Vehicle"> | number
    description?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    images?: StringNullableListFilter<"Vehicle">
    optionals?: StringNullableListFilter<"Vehicle">
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    status?: StringWithAggregatesFilter<"Vehicle"> | string
    fuelType?: StringWithAggregatesFilter<"Vehicle"> | string
    transmission?: StringWithAggregatesFilter<"Vehicle"> | string
    vehicleBrand?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    vehicleType?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
  }

  export type VisitBookingWhereInput = {
    AND?: VisitBookingWhereInput | VisitBookingWhereInput[]
    OR?: VisitBookingWhereInput[]
    NOT?: VisitBookingWhereInput | VisitBookingWhereInput[]
    id?: StringFilter<"VisitBooking"> | string
    userId?: StringFilter<"VisitBooking"> | string
    dealershipInfoId?: StringFilter<"VisitBooking"> | string
    visitDate?: DateTimeFilter<"VisitBooking"> | Date | string
    startTime?: StringFilter<"VisitBooking"> | string
    endTime?: StringFilter<"VisitBooking"> | string
    status?: EnumBookingStatusFilter<"VisitBooking"> | $Enums.BookingStatus
    notes?: StringNullableFilter<"VisitBooking"> | string | null
    createdAt?: DateTimeFilter<"VisitBooking"> | Date | string
    updatedAt?: DateTimeFilter<"VisitBooking"> | Date | string
    vehicleId?: StringNullableFilter<"VisitBooking"> | string | null
    dealershipInfo?: XOR<DealershipInfoScalarRelationFilter, DealershipInfoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
  }

  export type VisitBookingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dealershipInfoId?: SortOrder
    visitDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicleId?: SortOrderInput | SortOrder
    dealershipInfo?: DealershipInfoOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    Vehicle?: VehicleOrderByWithRelationInput
  }

  export type VisitBookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VisitBookingWhereInput | VisitBookingWhereInput[]
    OR?: VisitBookingWhereInput[]
    NOT?: VisitBookingWhereInput | VisitBookingWhereInput[]
    userId?: StringFilter<"VisitBooking"> | string
    dealershipInfoId?: StringFilter<"VisitBooking"> | string
    visitDate?: DateTimeFilter<"VisitBooking"> | Date | string
    startTime?: StringFilter<"VisitBooking"> | string
    endTime?: StringFilter<"VisitBooking"> | string
    status?: EnumBookingStatusFilter<"VisitBooking"> | $Enums.BookingStatus
    notes?: StringNullableFilter<"VisitBooking"> | string | null
    createdAt?: DateTimeFilter<"VisitBooking"> | Date | string
    updatedAt?: DateTimeFilter<"VisitBooking"> | Date | string
    vehicleId?: StringNullableFilter<"VisitBooking"> | string | null
    dealershipInfo?: XOR<DealershipInfoScalarRelationFilter, DealershipInfoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
  }, "id">

  export type VisitBookingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dealershipInfoId?: SortOrder
    visitDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicleId?: SortOrderInput | SortOrder
    _count?: VisitBookingCountOrderByAggregateInput
    _max?: VisitBookingMaxOrderByAggregateInput
    _min?: VisitBookingMinOrderByAggregateInput
  }

  export type VisitBookingScalarWhereWithAggregatesInput = {
    AND?: VisitBookingScalarWhereWithAggregatesInput | VisitBookingScalarWhereWithAggregatesInput[]
    OR?: VisitBookingScalarWhereWithAggregatesInput[]
    NOT?: VisitBookingScalarWhereWithAggregatesInput | VisitBookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VisitBooking"> | string
    userId?: StringWithAggregatesFilter<"VisitBooking"> | string
    dealershipInfoId?: StringWithAggregatesFilter<"VisitBooking"> | string
    visitDate?: DateTimeWithAggregatesFilter<"VisitBooking"> | Date | string
    startTime?: StringWithAggregatesFilter<"VisitBooking"> | string
    endTime?: StringWithAggregatesFilter<"VisitBooking"> | string
    status?: EnumBookingStatusWithAggregatesFilter<"VisitBooking"> | $Enums.BookingStatus
    notes?: StringNullableWithAggregatesFilter<"VisitBooking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VisitBooking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VisitBooking"> | Date | string
    vehicleId?: StringNullableWithAggregatesFilter<"VisitBooking"> | string | null
  }

  export type WorkingHourWhereInput = {
    AND?: WorkingHourWhereInput | WorkingHourWhereInput[]
    OR?: WorkingHourWhereInput[]
    NOT?: WorkingHourWhereInput | WorkingHourWhereInput[]
    id?: StringFilter<"WorkingHour"> | string
    dealershipInfoId?: StringFilter<"WorkingHour"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WorkingHour"> | $Enums.DayOfWeek
    isOpen?: BoolFilter<"WorkingHour"> | boolean
    openTime?: StringFilter<"WorkingHour"> | string
    closeTime?: StringFilter<"WorkingHour"> | string
    createdAt?: DateTimeFilter<"WorkingHour"> | Date | string
    updatedAt?: DateTimeFilter<"WorkingHour"> | Date | string
    dealershipInfo?: XOR<DealershipInfoScalarRelationFilter, DealershipInfoWhereInput>
  }

  export type WorkingHourOrderByWithRelationInput = {
    id?: SortOrder
    dealershipInfoId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dealershipInfo?: DealershipInfoOrderByWithRelationInput
  }

  export type WorkingHourWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dealershipInfoId_dayOfWeek?: WorkingHourDealershipInfoIdDayOfWeekCompoundUniqueInput
    AND?: WorkingHourWhereInput | WorkingHourWhereInput[]
    OR?: WorkingHourWhereInput[]
    NOT?: WorkingHourWhereInput | WorkingHourWhereInput[]
    dealershipInfoId?: StringFilter<"WorkingHour"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WorkingHour"> | $Enums.DayOfWeek
    isOpen?: BoolFilter<"WorkingHour"> | boolean
    openTime?: StringFilter<"WorkingHour"> | string
    closeTime?: StringFilter<"WorkingHour"> | string
    createdAt?: DateTimeFilter<"WorkingHour"> | Date | string
    updatedAt?: DateTimeFilter<"WorkingHour"> | Date | string
    dealershipInfo?: XOR<DealershipInfoScalarRelationFilter, DealershipInfoWhereInput>
  }, "id" | "dealershipInfoId_dayOfWeek">

  export type WorkingHourOrderByWithAggregationInput = {
    id?: SortOrder
    dealershipInfoId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkingHourCountOrderByAggregateInput
    _max?: WorkingHourMaxOrderByAggregateInput
    _min?: WorkingHourMinOrderByAggregateInput
  }

  export type WorkingHourScalarWhereWithAggregatesInput = {
    AND?: WorkingHourScalarWhereWithAggregatesInput | WorkingHourScalarWhereWithAggregatesInput[]
    OR?: WorkingHourScalarWhereWithAggregatesInput[]
    NOT?: WorkingHourScalarWhereWithAggregatesInput | WorkingHourScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkingHour"> | string
    dealershipInfoId?: StringWithAggregatesFilter<"WorkingHour"> | string
    dayOfWeek?: EnumDayOfWeekWithAggregatesFilter<"WorkingHour"> | $Enums.DayOfWeek
    isOpen?: BoolWithAggregatesFilter<"WorkingHour"> | boolean
    openTime?: StringWithAggregatesFilter<"WorkingHour"> | string
    closeTime?: StringWithAggregatesFilter<"WorkingHour"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkingHour"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkingHour"> | Date | string
  }

  export type DealershipInfoCreateInput = {
    id?: string
    name?: string
    address?: string
    phone?: string | null
    email?: string | null
    website?: string | null
    socialMedia?: string | null
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workingHourId: string
    visitBookings?: VisitBookingCreateNestedManyWithoutDealershipInfoInput
    workingHours?: WorkingHourCreateNestedManyWithoutDealershipInfoInput
  }

  export type DealershipInfoUncheckedCreateInput = {
    id?: string
    name?: string
    address?: string
    phone?: string | null
    email?: string | null
    website?: string | null
    socialMedia?: string | null
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workingHourId: string
    visitBookings?: VisitBookingUncheckedCreateNestedManyWithoutDealershipInfoInput
    workingHours?: WorkingHourUncheckedCreateNestedManyWithoutDealershipInfoInput
  }

  export type DealershipInfoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
    visitBookings?: VisitBookingUpdateManyWithoutDealershipInfoNestedInput
    workingHours?: WorkingHourUpdateManyWithoutDealershipInfoNestedInput
  }

  export type DealershipInfoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
    visitBookings?: VisitBookingUncheckedUpdateManyWithoutDealershipInfoNestedInput
    workingHours?: WorkingHourUncheckedUpdateManyWithoutDealershipInfoNestedInput
  }

  export type DealershipInfoCreateManyInput = {
    id?: string
    name?: string
    address?: string
    phone?: string | null
    email?: string | null
    website?: string | null
    socialMedia?: string | null
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workingHourId: string
  }

  export type DealershipInfoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
  }

  export type DealershipInfoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    clerkUserId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    phone?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    savedCars?: UserSavedVehicleCreateNestedManyWithoutUserInput
    visitBooking?: VisitBookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkUserId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    phone?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    savedCars?: UserSavedVehicleUncheckedCreateNestedManyWithoutUserInput
    visitBooking?: VisitBookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedCars?: UserSavedVehicleUpdateManyWithoutUserNestedInput
    visitBooking?: VisitBookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedCars?: UserSavedVehicleUncheckedUpdateManyWithoutUserNestedInput
    visitBooking?: VisitBookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkUserId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    phone?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSavedVehicleCreateInput = {
    id?: string
    savedAt?: Date | string
    user: UserCreateNestedOneWithoutSavedCarsInput
    vehicle: VehicleCreateNestedOneWithoutSavedByInput
  }

  export type UserSavedVehicleUncheckedCreateInput = {
    id?: string
    userId: string
    vehicleId: string
    savedAt?: Date | string
  }

  export type UserSavedVehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedCarsNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type UserSavedVehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSavedVehicleCreateManyInput = {
    id?: string
    userId: string
    vehicleId: string
    savedAt?: Date | string
  }

  export type UserSavedVehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSavedVehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    category?: string
    model: string
    year: number
    price: Decimal | DecimalJsLike | number | string
    color: string
    featured?: boolean
    seats?: number | null
    doors?: number | null
    engineSize?: string | null
    mileage: number
    description?: string | null
    images?: VehicleCreateimagesInput | string[]
    optionals?: VehicleCreateoptionalsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: string
    fuelType?: string
    transmission?: string
    vehicleBrand?: string | null
    vehicleType?: string | null
    savedBy?: UserSavedVehicleCreateNestedManyWithoutVehicleInput
    visits?: VisitBookingCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    category?: string
    model: string
    year: number
    price: Decimal | DecimalJsLike | number | string
    color: string
    featured?: boolean
    seats?: number | null
    doors?: number | null
    engineSize?: string | null
    mileage: number
    description?: string | null
    images?: VehicleCreateimagesInput | string[]
    optionals?: VehicleCreateoptionalsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: string
    fuelType?: string
    transmission?: string
    vehicleBrand?: string | null
    vehicleType?: string | null
    savedBy?: UserSavedVehicleUncheckedCreateNestedManyWithoutVehicleInput
    visits?: VisitBookingUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    savedBy?: UserSavedVehicleUpdateManyWithoutVehicleNestedInput
    visits?: VisitBookingUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    savedBy?: UserSavedVehicleUncheckedUpdateManyWithoutVehicleNestedInput
    visits?: VisitBookingUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    category?: string
    model: string
    year: number
    price: Decimal | DecimalJsLike | number | string
    color: string
    featured?: boolean
    seats?: number | null
    doors?: number | null
    engineSize?: string | null
    mileage: number
    description?: string | null
    images?: VehicleCreateimagesInput | string[]
    optionals?: VehicleCreateoptionalsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: string
    fuelType?: string
    transmission?: string
    vehicleBrand?: string | null
    vehicleType?: string | null
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VisitBookingCreateInput = {
    id?: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dealershipInfo: DealershipInfoCreateNestedOneWithoutVisitBookingsInput
    user: UserCreateNestedOneWithoutVisitBookingInput
    Vehicle?: VehicleCreateNestedOneWithoutVisitsInput
  }

  export type VisitBookingUncheckedCreateInput = {
    id?: string
    userId: string
    dealershipInfoId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicleId?: string | null
  }

  export type VisitBookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dealershipInfo?: DealershipInfoUpdateOneRequiredWithoutVisitBookingsNestedInput
    user?: UserUpdateOneRequiredWithoutVisitBookingNestedInput
    Vehicle?: VehicleUpdateOneWithoutVisitsNestedInput
  }

  export type VisitBookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VisitBookingCreateManyInput = {
    id?: string
    userId: string
    dealershipInfoId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicleId?: string | null
  }

  export type VisitBookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitBookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkingHourCreateInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    isOpen?: boolean
    openTime: string
    closeTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dealershipInfo: DealershipInfoCreateNestedOneWithoutWorkingHoursInput
  }

  export type WorkingHourUncheckedCreateInput = {
    id?: string
    dealershipInfoId: string
    dayOfWeek: $Enums.DayOfWeek
    isOpen?: boolean
    openTime: string
    closeTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkingHourUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dealershipInfo?: DealershipInfoUpdateOneRequiredWithoutWorkingHoursNestedInput
  }

  export type WorkingHourUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkingHourCreateManyInput = {
    id?: string
    dealershipInfoId: string
    dayOfWeek: $Enums.DayOfWeek
    isOpen?: boolean
    openTime: string
    closeTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkingHourUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkingHourUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VisitBookingListRelationFilter = {
    every?: VisitBookingWhereInput
    some?: VisitBookingWhereInput
    none?: VisitBookingWhereInput
  }

  export type WorkingHourListRelationFilter = {
    every?: WorkingHourWhereInput
    some?: WorkingHourWhereInput
    none?: WorkingHourWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VisitBookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkingHourOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DealershipInfoCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    socialMedia?: SortOrder
    logoUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workingHourId?: SortOrder
  }

  export type DealershipInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    socialMedia?: SortOrder
    logoUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workingHourId?: SortOrder
  }

  export type DealershipInfoMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    socialMedia?: SortOrder
    logoUrl?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workingHourId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type UserSavedVehicleListRelationFilter = {
    every?: UserSavedVehicleWhereInput
    some?: UserSavedVehicleWhereInput
    none?: UserSavedVehicleWhereInput
  }

  export type UserSavedVehicleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type UserSavedVehicleUserIdVehicleIdCompoundUniqueInput = {
    userId: string
    vehicleId: string
  }

  export type UserSavedVehicleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    savedAt?: SortOrder
  }

  export type UserSavedVehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    savedAt?: SortOrder
  }

  export type UserSavedVehicleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    savedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    color?: SortOrder
    featured?: SortOrder
    seats?: SortOrder
    doors?: SortOrder
    engineSize?: SortOrder
    mileage?: SortOrder
    description?: SortOrder
    images?: SortOrder
    optionals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    vehicleBrand?: SortOrder
    vehicleType?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
    seats?: SortOrder
    doors?: SortOrder
    mileage?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    color?: SortOrder
    featured?: SortOrder
    seats?: SortOrder
    doors?: SortOrder
    engineSize?: SortOrder
    mileage?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    vehicleBrand?: SortOrder
    vehicleType?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    color?: SortOrder
    featured?: SortOrder
    seats?: SortOrder
    doors?: SortOrder
    engineSize?: SortOrder
    mileage?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    vehicleBrand?: SortOrder
    vehicleType?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
    seats?: SortOrder
    doors?: SortOrder
    mileage?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type DealershipInfoScalarRelationFilter = {
    is?: DealershipInfoWhereInput
    isNot?: DealershipInfoWhereInput
  }

  export type VehicleNullableScalarRelationFilter = {
    is?: VehicleWhereInput | null
    isNot?: VehicleWhereInput | null
  }

  export type VisitBookingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dealershipInfoId?: SortOrder
    visitDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicleId?: SortOrder
  }

  export type VisitBookingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dealershipInfoId?: SortOrder
    visitDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicleId?: SortOrder
  }

  export type VisitBookingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dealershipInfoId?: SortOrder
    visitDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicleId?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type WorkingHourDealershipInfoIdDayOfWeekCompoundUniqueInput = {
    dealershipInfoId: string
    dayOfWeek: $Enums.DayOfWeek
  }

  export type WorkingHourCountOrderByAggregateInput = {
    id?: SortOrder
    dealershipInfoId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkingHourMaxOrderByAggregateInput = {
    id?: SortOrder
    dealershipInfoId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkingHourMinOrderByAggregateInput = {
    id?: SortOrder
    dealershipInfoId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type VisitBookingCreateNestedManyWithoutDealershipInfoInput = {
    create?: XOR<VisitBookingCreateWithoutDealershipInfoInput, VisitBookingUncheckedCreateWithoutDealershipInfoInput> | VisitBookingCreateWithoutDealershipInfoInput[] | VisitBookingUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutDealershipInfoInput | VisitBookingCreateOrConnectWithoutDealershipInfoInput[]
    createMany?: VisitBookingCreateManyDealershipInfoInputEnvelope
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
  }

  export type WorkingHourCreateNestedManyWithoutDealershipInfoInput = {
    create?: XOR<WorkingHourCreateWithoutDealershipInfoInput, WorkingHourUncheckedCreateWithoutDealershipInfoInput> | WorkingHourCreateWithoutDealershipInfoInput[] | WorkingHourUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: WorkingHourCreateOrConnectWithoutDealershipInfoInput | WorkingHourCreateOrConnectWithoutDealershipInfoInput[]
    createMany?: WorkingHourCreateManyDealershipInfoInputEnvelope
    connect?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
  }

  export type VisitBookingUncheckedCreateNestedManyWithoutDealershipInfoInput = {
    create?: XOR<VisitBookingCreateWithoutDealershipInfoInput, VisitBookingUncheckedCreateWithoutDealershipInfoInput> | VisitBookingCreateWithoutDealershipInfoInput[] | VisitBookingUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutDealershipInfoInput | VisitBookingCreateOrConnectWithoutDealershipInfoInput[]
    createMany?: VisitBookingCreateManyDealershipInfoInputEnvelope
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
  }

  export type WorkingHourUncheckedCreateNestedManyWithoutDealershipInfoInput = {
    create?: XOR<WorkingHourCreateWithoutDealershipInfoInput, WorkingHourUncheckedCreateWithoutDealershipInfoInput> | WorkingHourCreateWithoutDealershipInfoInput[] | WorkingHourUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: WorkingHourCreateOrConnectWithoutDealershipInfoInput | WorkingHourCreateOrConnectWithoutDealershipInfoInput[]
    createMany?: WorkingHourCreateManyDealershipInfoInputEnvelope
    connect?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VisitBookingUpdateManyWithoutDealershipInfoNestedInput = {
    create?: XOR<VisitBookingCreateWithoutDealershipInfoInput, VisitBookingUncheckedCreateWithoutDealershipInfoInput> | VisitBookingCreateWithoutDealershipInfoInput[] | VisitBookingUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutDealershipInfoInput | VisitBookingCreateOrConnectWithoutDealershipInfoInput[]
    upsert?: VisitBookingUpsertWithWhereUniqueWithoutDealershipInfoInput | VisitBookingUpsertWithWhereUniqueWithoutDealershipInfoInput[]
    createMany?: VisitBookingCreateManyDealershipInfoInputEnvelope
    set?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    disconnect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    delete?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    update?: VisitBookingUpdateWithWhereUniqueWithoutDealershipInfoInput | VisitBookingUpdateWithWhereUniqueWithoutDealershipInfoInput[]
    updateMany?: VisitBookingUpdateManyWithWhereWithoutDealershipInfoInput | VisitBookingUpdateManyWithWhereWithoutDealershipInfoInput[]
    deleteMany?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
  }

  export type WorkingHourUpdateManyWithoutDealershipInfoNestedInput = {
    create?: XOR<WorkingHourCreateWithoutDealershipInfoInput, WorkingHourUncheckedCreateWithoutDealershipInfoInput> | WorkingHourCreateWithoutDealershipInfoInput[] | WorkingHourUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: WorkingHourCreateOrConnectWithoutDealershipInfoInput | WorkingHourCreateOrConnectWithoutDealershipInfoInput[]
    upsert?: WorkingHourUpsertWithWhereUniqueWithoutDealershipInfoInput | WorkingHourUpsertWithWhereUniqueWithoutDealershipInfoInput[]
    createMany?: WorkingHourCreateManyDealershipInfoInputEnvelope
    set?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    disconnect?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    delete?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    connect?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    update?: WorkingHourUpdateWithWhereUniqueWithoutDealershipInfoInput | WorkingHourUpdateWithWhereUniqueWithoutDealershipInfoInput[]
    updateMany?: WorkingHourUpdateManyWithWhereWithoutDealershipInfoInput | WorkingHourUpdateManyWithWhereWithoutDealershipInfoInput[]
    deleteMany?: WorkingHourScalarWhereInput | WorkingHourScalarWhereInput[]
  }

  export type VisitBookingUncheckedUpdateManyWithoutDealershipInfoNestedInput = {
    create?: XOR<VisitBookingCreateWithoutDealershipInfoInput, VisitBookingUncheckedCreateWithoutDealershipInfoInput> | VisitBookingCreateWithoutDealershipInfoInput[] | VisitBookingUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutDealershipInfoInput | VisitBookingCreateOrConnectWithoutDealershipInfoInput[]
    upsert?: VisitBookingUpsertWithWhereUniqueWithoutDealershipInfoInput | VisitBookingUpsertWithWhereUniqueWithoutDealershipInfoInput[]
    createMany?: VisitBookingCreateManyDealershipInfoInputEnvelope
    set?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    disconnect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    delete?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    update?: VisitBookingUpdateWithWhereUniqueWithoutDealershipInfoInput | VisitBookingUpdateWithWhereUniqueWithoutDealershipInfoInput[]
    updateMany?: VisitBookingUpdateManyWithWhereWithoutDealershipInfoInput | VisitBookingUpdateManyWithWhereWithoutDealershipInfoInput[]
    deleteMany?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
  }

  export type WorkingHourUncheckedUpdateManyWithoutDealershipInfoNestedInput = {
    create?: XOR<WorkingHourCreateWithoutDealershipInfoInput, WorkingHourUncheckedCreateWithoutDealershipInfoInput> | WorkingHourCreateWithoutDealershipInfoInput[] | WorkingHourUncheckedCreateWithoutDealershipInfoInput[]
    connectOrCreate?: WorkingHourCreateOrConnectWithoutDealershipInfoInput | WorkingHourCreateOrConnectWithoutDealershipInfoInput[]
    upsert?: WorkingHourUpsertWithWhereUniqueWithoutDealershipInfoInput | WorkingHourUpsertWithWhereUniqueWithoutDealershipInfoInput[]
    createMany?: WorkingHourCreateManyDealershipInfoInputEnvelope
    set?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    disconnect?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    delete?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    connect?: WorkingHourWhereUniqueInput | WorkingHourWhereUniqueInput[]
    update?: WorkingHourUpdateWithWhereUniqueWithoutDealershipInfoInput | WorkingHourUpdateWithWhereUniqueWithoutDealershipInfoInput[]
    updateMany?: WorkingHourUpdateManyWithWhereWithoutDealershipInfoInput | WorkingHourUpdateManyWithWhereWithoutDealershipInfoInput[]
    deleteMany?: WorkingHourScalarWhereInput | WorkingHourScalarWhereInput[]
  }

  export type UserSavedVehicleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSavedVehicleCreateWithoutUserInput, UserSavedVehicleUncheckedCreateWithoutUserInput> | UserSavedVehicleCreateWithoutUserInput[] | UserSavedVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutUserInput | UserSavedVehicleCreateOrConnectWithoutUserInput[]
    createMany?: UserSavedVehicleCreateManyUserInputEnvelope
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
  }

  export type VisitBookingCreateNestedManyWithoutUserInput = {
    create?: XOR<VisitBookingCreateWithoutUserInput, VisitBookingUncheckedCreateWithoutUserInput> | VisitBookingCreateWithoutUserInput[] | VisitBookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutUserInput | VisitBookingCreateOrConnectWithoutUserInput[]
    createMany?: VisitBookingCreateManyUserInputEnvelope
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
  }

  export type UserSavedVehicleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSavedVehicleCreateWithoutUserInput, UserSavedVehicleUncheckedCreateWithoutUserInput> | UserSavedVehicleCreateWithoutUserInput[] | UserSavedVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutUserInput | UserSavedVehicleCreateOrConnectWithoutUserInput[]
    createMany?: UserSavedVehicleCreateManyUserInputEnvelope
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
  }

  export type VisitBookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VisitBookingCreateWithoutUserInput, VisitBookingUncheckedCreateWithoutUserInput> | VisitBookingCreateWithoutUserInput[] | VisitBookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutUserInput | VisitBookingCreateOrConnectWithoutUserInput[]
    createMany?: VisitBookingCreateManyUserInputEnvelope
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type UserSavedVehicleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSavedVehicleCreateWithoutUserInput, UserSavedVehicleUncheckedCreateWithoutUserInput> | UserSavedVehicleCreateWithoutUserInput[] | UserSavedVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutUserInput | UserSavedVehicleCreateOrConnectWithoutUserInput[]
    upsert?: UserSavedVehicleUpsertWithWhereUniqueWithoutUserInput | UserSavedVehicleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSavedVehicleCreateManyUserInputEnvelope
    set?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    disconnect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    delete?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    update?: UserSavedVehicleUpdateWithWhereUniqueWithoutUserInput | UserSavedVehicleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSavedVehicleUpdateManyWithWhereWithoutUserInput | UserSavedVehicleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSavedVehicleScalarWhereInput | UserSavedVehicleScalarWhereInput[]
  }

  export type VisitBookingUpdateManyWithoutUserNestedInput = {
    create?: XOR<VisitBookingCreateWithoutUserInput, VisitBookingUncheckedCreateWithoutUserInput> | VisitBookingCreateWithoutUserInput[] | VisitBookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutUserInput | VisitBookingCreateOrConnectWithoutUserInput[]
    upsert?: VisitBookingUpsertWithWhereUniqueWithoutUserInput | VisitBookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VisitBookingCreateManyUserInputEnvelope
    set?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    disconnect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    delete?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    update?: VisitBookingUpdateWithWhereUniqueWithoutUserInput | VisitBookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VisitBookingUpdateManyWithWhereWithoutUserInput | VisitBookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
  }

  export type UserSavedVehicleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSavedVehicleCreateWithoutUserInput, UserSavedVehicleUncheckedCreateWithoutUserInput> | UserSavedVehicleCreateWithoutUserInput[] | UserSavedVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutUserInput | UserSavedVehicleCreateOrConnectWithoutUserInput[]
    upsert?: UserSavedVehicleUpsertWithWhereUniqueWithoutUserInput | UserSavedVehicleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSavedVehicleCreateManyUserInputEnvelope
    set?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    disconnect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    delete?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    update?: UserSavedVehicleUpdateWithWhereUniqueWithoutUserInput | UserSavedVehicleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSavedVehicleUpdateManyWithWhereWithoutUserInput | UserSavedVehicleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSavedVehicleScalarWhereInput | UserSavedVehicleScalarWhereInput[]
  }

  export type VisitBookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VisitBookingCreateWithoutUserInput, VisitBookingUncheckedCreateWithoutUserInput> | VisitBookingCreateWithoutUserInput[] | VisitBookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutUserInput | VisitBookingCreateOrConnectWithoutUserInput[]
    upsert?: VisitBookingUpsertWithWhereUniqueWithoutUserInput | VisitBookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VisitBookingCreateManyUserInputEnvelope
    set?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    disconnect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    delete?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    update?: VisitBookingUpdateWithWhereUniqueWithoutUserInput | VisitBookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VisitBookingUpdateManyWithWhereWithoutUserInput | VisitBookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSavedCarsInput = {
    create?: XOR<UserCreateWithoutSavedCarsInput, UserUncheckedCreateWithoutSavedCarsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedCarsInput
    connect?: UserWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutSavedByInput = {
    create?: XOR<VehicleCreateWithoutSavedByInput, VehicleUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutSavedByInput
    connect?: VehicleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedCarsNestedInput = {
    create?: XOR<UserCreateWithoutSavedCarsInput, UserUncheckedCreateWithoutSavedCarsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedCarsInput
    upsert?: UserUpsertWithoutSavedCarsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedCarsInput, UserUpdateWithoutSavedCarsInput>, UserUncheckedUpdateWithoutSavedCarsInput>
  }

  export type VehicleUpdateOneRequiredWithoutSavedByNestedInput = {
    create?: XOR<VehicleCreateWithoutSavedByInput, VehicleUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutSavedByInput
    upsert?: VehicleUpsertWithoutSavedByInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutSavedByInput, VehicleUpdateWithoutSavedByInput>, VehicleUncheckedUpdateWithoutSavedByInput>
  }

  export type VehicleCreateimagesInput = {
    set: string[]
  }

  export type VehicleCreateoptionalsInput = {
    set: string[]
  }

  export type UserSavedVehicleCreateNestedManyWithoutVehicleInput = {
    create?: XOR<UserSavedVehicleCreateWithoutVehicleInput, UserSavedVehicleUncheckedCreateWithoutVehicleInput> | UserSavedVehicleCreateWithoutVehicleInput[] | UserSavedVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutVehicleInput | UserSavedVehicleCreateOrConnectWithoutVehicleInput[]
    createMany?: UserSavedVehicleCreateManyVehicleInputEnvelope
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
  }

  export type VisitBookingCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VisitBookingCreateWithoutVehicleInput, VisitBookingUncheckedCreateWithoutVehicleInput> | VisitBookingCreateWithoutVehicleInput[] | VisitBookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutVehicleInput | VisitBookingCreateOrConnectWithoutVehicleInput[]
    createMany?: VisitBookingCreateManyVehicleInputEnvelope
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
  }

  export type UserSavedVehicleUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<UserSavedVehicleCreateWithoutVehicleInput, UserSavedVehicleUncheckedCreateWithoutVehicleInput> | UserSavedVehicleCreateWithoutVehicleInput[] | UserSavedVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutVehicleInput | UserSavedVehicleCreateOrConnectWithoutVehicleInput[]
    createMany?: UserSavedVehicleCreateManyVehicleInputEnvelope
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
  }

  export type VisitBookingUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VisitBookingCreateWithoutVehicleInput, VisitBookingUncheckedCreateWithoutVehicleInput> | VisitBookingCreateWithoutVehicleInput[] | VisitBookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutVehicleInput | VisitBookingCreateOrConnectWithoutVehicleInput[]
    createMany?: VisitBookingCreateManyVehicleInputEnvelope
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VehicleUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type VehicleUpdateoptionalsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserSavedVehicleUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<UserSavedVehicleCreateWithoutVehicleInput, UserSavedVehicleUncheckedCreateWithoutVehicleInput> | UserSavedVehicleCreateWithoutVehicleInput[] | UserSavedVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutVehicleInput | UserSavedVehicleCreateOrConnectWithoutVehicleInput[]
    upsert?: UserSavedVehicleUpsertWithWhereUniqueWithoutVehicleInput | UserSavedVehicleUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: UserSavedVehicleCreateManyVehicleInputEnvelope
    set?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    disconnect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    delete?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    update?: UserSavedVehicleUpdateWithWhereUniqueWithoutVehicleInput | UserSavedVehicleUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: UserSavedVehicleUpdateManyWithWhereWithoutVehicleInput | UserSavedVehicleUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: UserSavedVehicleScalarWhereInput | UserSavedVehicleScalarWhereInput[]
  }

  export type VisitBookingUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VisitBookingCreateWithoutVehicleInput, VisitBookingUncheckedCreateWithoutVehicleInput> | VisitBookingCreateWithoutVehicleInput[] | VisitBookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutVehicleInput | VisitBookingCreateOrConnectWithoutVehicleInput[]
    upsert?: VisitBookingUpsertWithWhereUniqueWithoutVehicleInput | VisitBookingUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VisitBookingCreateManyVehicleInputEnvelope
    set?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    disconnect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    delete?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    update?: VisitBookingUpdateWithWhereUniqueWithoutVehicleInput | VisitBookingUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VisitBookingUpdateManyWithWhereWithoutVehicleInput | VisitBookingUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
  }

  export type UserSavedVehicleUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<UserSavedVehicleCreateWithoutVehicleInput, UserSavedVehicleUncheckedCreateWithoutVehicleInput> | UserSavedVehicleCreateWithoutVehicleInput[] | UserSavedVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserSavedVehicleCreateOrConnectWithoutVehicleInput | UserSavedVehicleCreateOrConnectWithoutVehicleInput[]
    upsert?: UserSavedVehicleUpsertWithWhereUniqueWithoutVehicleInput | UserSavedVehicleUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: UserSavedVehicleCreateManyVehicleInputEnvelope
    set?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    disconnect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    delete?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    connect?: UserSavedVehicleWhereUniqueInput | UserSavedVehicleWhereUniqueInput[]
    update?: UserSavedVehicleUpdateWithWhereUniqueWithoutVehicleInput | UserSavedVehicleUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: UserSavedVehicleUpdateManyWithWhereWithoutVehicleInput | UserSavedVehicleUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: UserSavedVehicleScalarWhereInput | UserSavedVehicleScalarWhereInput[]
  }

  export type VisitBookingUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VisitBookingCreateWithoutVehicleInput, VisitBookingUncheckedCreateWithoutVehicleInput> | VisitBookingCreateWithoutVehicleInput[] | VisitBookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VisitBookingCreateOrConnectWithoutVehicleInput | VisitBookingCreateOrConnectWithoutVehicleInput[]
    upsert?: VisitBookingUpsertWithWhereUniqueWithoutVehicleInput | VisitBookingUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VisitBookingCreateManyVehicleInputEnvelope
    set?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    disconnect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    delete?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    connect?: VisitBookingWhereUniqueInput | VisitBookingWhereUniqueInput[]
    update?: VisitBookingUpdateWithWhereUniqueWithoutVehicleInput | VisitBookingUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VisitBookingUpdateManyWithWhereWithoutVehicleInput | VisitBookingUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
  }

  export type DealershipInfoCreateNestedOneWithoutVisitBookingsInput = {
    create?: XOR<DealershipInfoCreateWithoutVisitBookingsInput, DealershipInfoUncheckedCreateWithoutVisitBookingsInput>
    connectOrCreate?: DealershipInfoCreateOrConnectWithoutVisitBookingsInput
    connect?: DealershipInfoWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVisitBookingInput = {
    create?: XOR<UserCreateWithoutVisitBookingInput, UserUncheckedCreateWithoutVisitBookingInput>
    connectOrCreate?: UserCreateOrConnectWithoutVisitBookingInput
    connect?: UserWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutVisitsInput = {
    create?: XOR<VehicleCreateWithoutVisitsInput, VehicleUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutVisitsInput
    connect?: VehicleWhereUniqueInput
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type DealershipInfoUpdateOneRequiredWithoutVisitBookingsNestedInput = {
    create?: XOR<DealershipInfoCreateWithoutVisitBookingsInput, DealershipInfoUncheckedCreateWithoutVisitBookingsInput>
    connectOrCreate?: DealershipInfoCreateOrConnectWithoutVisitBookingsInput
    upsert?: DealershipInfoUpsertWithoutVisitBookingsInput
    connect?: DealershipInfoWhereUniqueInput
    update?: XOR<XOR<DealershipInfoUpdateToOneWithWhereWithoutVisitBookingsInput, DealershipInfoUpdateWithoutVisitBookingsInput>, DealershipInfoUncheckedUpdateWithoutVisitBookingsInput>
  }

  export type UserUpdateOneRequiredWithoutVisitBookingNestedInput = {
    create?: XOR<UserCreateWithoutVisitBookingInput, UserUncheckedCreateWithoutVisitBookingInput>
    connectOrCreate?: UserCreateOrConnectWithoutVisitBookingInput
    upsert?: UserUpsertWithoutVisitBookingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVisitBookingInput, UserUpdateWithoutVisitBookingInput>, UserUncheckedUpdateWithoutVisitBookingInput>
  }

  export type VehicleUpdateOneWithoutVisitsNestedInput = {
    create?: XOR<VehicleCreateWithoutVisitsInput, VehicleUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutVisitsInput
    upsert?: VehicleUpsertWithoutVisitsInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutVisitsInput, VehicleUpdateWithoutVisitsInput>, VehicleUncheckedUpdateWithoutVisitsInput>
  }

  export type DealershipInfoCreateNestedOneWithoutWorkingHoursInput = {
    create?: XOR<DealershipInfoCreateWithoutWorkingHoursInput, DealershipInfoUncheckedCreateWithoutWorkingHoursInput>
    connectOrCreate?: DealershipInfoCreateOrConnectWithoutWorkingHoursInput
    connect?: DealershipInfoWhereUniqueInput
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type DealershipInfoUpdateOneRequiredWithoutWorkingHoursNestedInput = {
    create?: XOR<DealershipInfoCreateWithoutWorkingHoursInput, DealershipInfoUncheckedCreateWithoutWorkingHoursInput>
    connectOrCreate?: DealershipInfoCreateOrConnectWithoutWorkingHoursInput
    upsert?: DealershipInfoUpsertWithoutWorkingHoursInput
    connect?: DealershipInfoWhereUniqueInput
    update?: XOR<XOR<DealershipInfoUpdateToOneWithWhereWithoutWorkingHoursInput, DealershipInfoUpdateWithoutWorkingHoursInput>, DealershipInfoUncheckedUpdateWithoutWorkingHoursInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type VisitBookingCreateWithoutDealershipInfoInput = {
    id?: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVisitBookingInput
    Vehicle?: VehicleCreateNestedOneWithoutVisitsInput
  }

  export type VisitBookingUncheckedCreateWithoutDealershipInfoInput = {
    id?: string
    userId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicleId?: string | null
  }

  export type VisitBookingCreateOrConnectWithoutDealershipInfoInput = {
    where: VisitBookingWhereUniqueInput
    create: XOR<VisitBookingCreateWithoutDealershipInfoInput, VisitBookingUncheckedCreateWithoutDealershipInfoInput>
  }

  export type VisitBookingCreateManyDealershipInfoInputEnvelope = {
    data: VisitBookingCreateManyDealershipInfoInput | VisitBookingCreateManyDealershipInfoInput[]
    skipDuplicates?: boolean
  }

  export type WorkingHourCreateWithoutDealershipInfoInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    isOpen?: boolean
    openTime: string
    closeTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkingHourUncheckedCreateWithoutDealershipInfoInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    isOpen?: boolean
    openTime: string
    closeTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkingHourCreateOrConnectWithoutDealershipInfoInput = {
    where: WorkingHourWhereUniqueInput
    create: XOR<WorkingHourCreateWithoutDealershipInfoInput, WorkingHourUncheckedCreateWithoutDealershipInfoInput>
  }

  export type WorkingHourCreateManyDealershipInfoInputEnvelope = {
    data: WorkingHourCreateManyDealershipInfoInput | WorkingHourCreateManyDealershipInfoInput[]
    skipDuplicates?: boolean
  }

  export type VisitBookingUpsertWithWhereUniqueWithoutDealershipInfoInput = {
    where: VisitBookingWhereUniqueInput
    update: XOR<VisitBookingUpdateWithoutDealershipInfoInput, VisitBookingUncheckedUpdateWithoutDealershipInfoInput>
    create: XOR<VisitBookingCreateWithoutDealershipInfoInput, VisitBookingUncheckedCreateWithoutDealershipInfoInput>
  }

  export type VisitBookingUpdateWithWhereUniqueWithoutDealershipInfoInput = {
    where: VisitBookingWhereUniqueInput
    data: XOR<VisitBookingUpdateWithoutDealershipInfoInput, VisitBookingUncheckedUpdateWithoutDealershipInfoInput>
  }

  export type VisitBookingUpdateManyWithWhereWithoutDealershipInfoInput = {
    where: VisitBookingScalarWhereInput
    data: XOR<VisitBookingUpdateManyMutationInput, VisitBookingUncheckedUpdateManyWithoutDealershipInfoInput>
  }

  export type VisitBookingScalarWhereInput = {
    AND?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
    OR?: VisitBookingScalarWhereInput[]
    NOT?: VisitBookingScalarWhereInput | VisitBookingScalarWhereInput[]
    id?: StringFilter<"VisitBooking"> | string
    userId?: StringFilter<"VisitBooking"> | string
    dealershipInfoId?: StringFilter<"VisitBooking"> | string
    visitDate?: DateTimeFilter<"VisitBooking"> | Date | string
    startTime?: StringFilter<"VisitBooking"> | string
    endTime?: StringFilter<"VisitBooking"> | string
    status?: EnumBookingStatusFilter<"VisitBooking"> | $Enums.BookingStatus
    notes?: StringNullableFilter<"VisitBooking"> | string | null
    createdAt?: DateTimeFilter<"VisitBooking"> | Date | string
    updatedAt?: DateTimeFilter<"VisitBooking"> | Date | string
    vehicleId?: StringNullableFilter<"VisitBooking"> | string | null
  }

  export type WorkingHourUpsertWithWhereUniqueWithoutDealershipInfoInput = {
    where: WorkingHourWhereUniqueInput
    update: XOR<WorkingHourUpdateWithoutDealershipInfoInput, WorkingHourUncheckedUpdateWithoutDealershipInfoInput>
    create: XOR<WorkingHourCreateWithoutDealershipInfoInput, WorkingHourUncheckedCreateWithoutDealershipInfoInput>
  }

  export type WorkingHourUpdateWithWhereUniqueWithoutDealershipInfoInput = {
    where: WorkingHourWhereUniqueInput
    data: XOR<WorkingHourUpdateWithoutDealershipInfoInput, WorkingHourUncheckedUpdateWithoutDealershipInfoInput>
  }

  export type WorkingHourUpdateManyWithWhereWithoutDealershipInfoInput = {
    where: WorkingHourScalarWhereInput
    data: XOR<WorkingHourUpdateManyMutationInput, WorkingHourUncheckedUpdateManyWithoutDealershipInfoInput>
  }

  export type WorkingHourScalarWhereInput = {
    AND?: WorkingHourScalarWhereInput | WorkingHourScalarWhereInput[]
    OR?: WorkingHourScalarWhereInput[]
    NOT?: WorkingHourScalarWhereInput | WorkingHourScalarWhereInput[]
    id?: StringFilter<"WorkingHour"> | string
    dealershipInfoId?: StringFilter<"WorkingHour"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WorkingHour"> | $Enums.DayOfWeek
    isOpen?: BoolFilter<"WorkingHour"> | boolean
    openTime?: StringFilter<"WorkingHour"> | string
    closeTime?: StringFilter<"WorkingHour"> | string
    createdAt?: DateTimeFilter<"WorkingHour"> | Date | string
    updatedAt?: DateTimeFilter<"WorkingHour"> | Date | string
  }

  export type UserSavedVehicleCreateWithoutUserInput = {
    id?: string
    savedAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutSavedByInput
  }

  export type UserSavedVehicleUncheckedCreateWithoutUserInput = {
    id?: string
    vehicleId: string
    savedAt?: Date | string
  }

  export type UserSavedVehicleCreateOrConnectWithoutUserInput = {
    where: UserSavedVehicleWhereUniqueInput
    create: XOR<UserSavedVehicleCreateWithoutUserInput, UserSavedVehicleUncheckedCreateWithoutUserInput>
  }

  export type UserSavedVehicleCreateManyUserInputEnvelope = {
    data: UserSavedVehicleCreateManyUserInput | UserSavedVehicleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VisitBookingCreateWithoutUserInput = {
    id?: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dealershipInfo: DealershipInfoCreateNestedOneWithoutVisitBookingsInput
    Vehicle?: VehicleCreateNestedOneWithoutVisitsInput
  }

  export type VisitBookingUncheckedCreateWithoutUserInput = {
    id?: string
    dealershipInfoId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicleId?: string | null
  }

  export type VisitBookingCreateOrConnectWithoutUserInput = {
    where: VisitBookingWhereUniqueInput
    create: XOR<VisitBookingCreateWithoutUserInput, VisitBookingUncheckedCreateWithoutUserInput>
  }

  export type VisitBookingCreateManyUserInputEnvelope = {
    data: VisitBookingCreateManyUserInput | VisitBookingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSavedVehicleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSavedVehicleWhereUniqueInput
    update: XOR<UserSavedVehicleUpdateWithoutUserInput, UserSavedVehicleUncheckedUpdateWithoutUserInput>
    create: XOR<UserSavedVehicleCreateWithoutUserInput, UserSavedVehicleUncheckedCreateWithoutUserInput>
  }

  export type UserSavedVehicleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSavedVehicleWhereUniqueInput
    data: XOR<UserSavedVehicleUpdateWithoutUserInput, UserSavedVehicleUncheckedUpdateWithoutUserInput>
  }

  export type UserSavedVehicleUpdateManyWithWhereWithoutUserInput = {
    where: UserSavedVehicleScalarWhereInput
    data: XOR<UserSavedVehicleUpdateManyMutationInput, UserSavedVehicleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSavedVehicleScalarWhereInput = {
    AND?: UserSavedVehicleScalarWhereInput | UserSavedVehicleScalarWhereInput[]
    OR?: UserSavedVehicleScalarWhereInput[]
    NOT?: UserSavedVehicleScalarWhereInput | UserSavedVehicleScalarWhereInput[]
    id?: StringFilter<"UserSavedVehicle"> | string
    userId?: StringFilter<"UserSavedVehicle"> | string
    vehicleId?: StringFilter<"UserSavedVehicle"> | string
    savedAt?: DateTimeFilter<"UserSavedVehicle"> | Date | string
  }

  export type VisitBookingUpsertWithWhereUniqueWithoutUserInput = {
    where: VisitBookingWhereUniqueInput
    update: XOR<VisitBookingUpdateWithoutUserInput, VisitBookingUncheckedUpdateWithoutUserInput>
    create: XOR<VisitBookingCreateWithoutUserInput, VisitBookingUncheckedCreateWithoutUserInput>
  }

  export type VisitBookingUpdateWithWhereUniqueWithoutUserInput = {
    where: VisitBookingWhereUniqueInput
    data: XOR<VisitBookingUpdateWithoutUserInput, VisitBookingUncheckedUpdateWithoutUserInput>
  }

  export type VisitBookingUpdateManyWithWhereWithoutUserInput = {
    where: VisitBookingScalarWhereInput
    data: XOR<VisitBookingUpdateManyMutationInput, VisitBookingUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutSavedCarsInput = {
    id?: string
    clerkUserId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    phone?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    visitBooking?: VisitBookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedCarsInput = {
    id?: string
    clerkUserId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    phone?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    visitBooking?: VisitBookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedCarsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedCarsInput, UserUncheckedCreateWithoutSavedCarsInput>
  }

  export type VehicleCreateWithoutSavedByInput = {
    id?: string
    category?: string
    model: string
    year: number
    price: Decimal | DecimalJsLike | number | string
    color: string
    featured?: boolean
    seats?: number | null
    doors?: number | null
    engineSize?: string | null
    mileage: number
    description?: string | null
    images?: VehicleCreateimagesInput | string[]
    optionals?: VehicleCreateoptionalsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: string
    fuelType?: string
    transmission?: string
    vehicleBrand?: string | null
    vehicleType?: string | null
    visits?: VisitBookingCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutSavedByInput = {
    id?: string
    category?: string
    model: string
    year: number
    price: Decimal | DecimalJsLike | number | string
    color: string
    featured?: boolean
    seats?: number | null
    doors?: number | null
    engineSize?: string | null
    mileage: number
    description?: string | null
    images?: VehicleCreateimagesInput | string[]
    optionals?: VehicleCreateoptionalsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: string
    fuelType?: string
    transmission?: string
    vehicleBrand?: string | null
    vehicleType?: string | null
    visits?: VisitBookingUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutSavedByInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutSavedByInput, VehicleUncheckedCreateWithoutSavedByInput>
  }

  export type UserUpsertWithoutSavedCarsInput = {
    update: XOR<UserUpdateWithoutSavedCarsInput, UserUncheckedUpdateWithoutSavedCarsInput>
    create: XOR<UserCreateWithoutSavedCarsInput, UserUncheckedCreateWithoutSavedCarsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedCarsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedCarsInput, UserUncheckedUpdateWithoutSavedCarsInput>
  }

  export type UserUpdateWithoutSavedCarsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitBooking?: VisitBookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedCarsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitBooking?: VisitBookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VehicleUpsertWithoutSavedByInput = {
    update: XOR<VehicleUpdateWithoutSavedByInput, VehicleUncheckedUpdateWithoutSavedByInput>
    create: XOR<VehicleCreateWithoutSavedByInput, VehicleUncheckedCreateWithoutSavedByInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutSavedByInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutSavedByInput, VehicleUncheckedUpdateWithoutSavedByInput>
  }

  export type VehicleUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    visits?: VisitBookingUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    visits?: VisitBookingUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type UserSavedVehicleCreateWithoutVehicleInput = {
    id?: string
    savedAt?: Date | string
    user: UserCreateNestedOneWithoutSavedCarsInput
  }

  export type UserSavedVehicleUncheckedCreateWithoutVehicleInput = {
    id?: string
    userId: string
    savedAt?: Date | string
  }

  export type UserSavedVehicleCreateOrConnectWithoutVehicleInput = {
    where: UserSavedVehicleWhereUniqueInput
    create: XOR<UserSavedVehicleCreateWithoutVehicleInput, UserSavedVehicleUncheckedCreateWithoutVehicleInput>
  }

  export type UserSavedVehicleCreateManyVehicleInputEnvelope = {
    data: UserSavedVehicleCreateManyVehicleInput | UserSavedVehicleCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type VisitBookingCreateWithoutVehicleInput = {
    id?: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dealershipInfo: DealershipInfoCreateNestedOneWithoutVisitBookingsInput
    user: UserCreateNestedOneWithoutVisitBookingInput
  }

  export type VisitBookingUncheckedCreateWithoutVehicleInput = {
    id?: string
    userId: string
    dealershipInfoId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitBookingCreateOrConnectWithoutVehicleInput = {
    where: VisitBookingWhereUniqueInput
    create: XOR<VisitBookingCreateWithoutVehicleInput, VisitBookingUncheckedCreateWithoutVehicleInput>
  }

  export type VisitBookingCreateManyVehicleInputEnvelope = {
    data: VisitBookingCreateManyVehicleInput | VisitBookingCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type UserSavedVehicleUpsertWithWhereUniqueWithoutVehicleInput = {
    where: UserSavedVehicleWhereUniqueInput
    update: XOR<UserSavedVehicleUpdateWithoutVehicleInput, UserSavedVehicleUncheckedUpdateWithoutVehicleInput>
    create: XOR<UserSavedVehicleCreateWithoutVehicleInput, UserSavedVehicleUncheckedCreateWithoutVehicleInput>
  }

  export type UserSavedVehicleUpdateWithWhereUniqueWithoutVehicleInput = {
    where: UserSavedVehicleWhereUniqueInput
    data: XOR<UserSavedVehicleUpdateWithoutVehicleInput, UserSavedVehicleUncheckedUpdateWithoutVehicleInput>
  }

  export type UserSavedVehicleUpdateManyWithWhereWithoutVehicleInput = {
    where: UserSavedVehicleScalarWhereInput
    data: XOR<UserSavedVehicleUpdateManyMutationInput, UserSavedVehicleUncheckedUpdateManyWithoutVehicleInput>
  }

  export type VisitBookingUpsertWithWhereUniqueWithoutVehicleInput = {
    where: VisitBookingWhereUniqueInput
    update: XOR<VisitBookingUpdateWithoutVehicleInput, VisitBookingUncheckedUpdateWithoutVehicleInput>
    create: XOR<VisitBookingCreateWithoutVehicleInput, VisitBookingUncheckedCreateWithoutVehicleInput>
  }

  export type VisitBookingUpdateWithWhereUniqueWithoutVehicleInput = {
    where: VisitBookingWhereUniqueInput
    data: XOR<VisitBookingUpdateWithoutVehicleInput, VisitBookingUncheckedUpdateWithoutVehicleInput>
  }

  export type VisitBookingUpdateManyWithWhereWithoutVehicleInput = {
    where: VisitBookingScalarWhereInput
    data: XOR<VisitBookingUpdateManyMutationInput, VisitBookingUncheckedUpdateManyWithoutVehicleInput>
  }

  export type DealershipInfoCreateWithoutVisitBookingsInput = {
    id?: string
    name?: string
    address?: string
    phone?: string | null
    email?: string | null
    website?: string | null
    socialMedia?: string | null
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workingHourId: string
    workingHours?: WorkingHourCreateNestedManyWithoutDealershipInfoInput
  }

  export type DealershipInfoUncheckedCreateWithoutVisitBookingsInput = {
    id?: string
    name?: string
    address?: string
    phone?: string | null
    email?: string | null
    website?: string | null
    socialMedia?: string | null
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workingHourId: string
    workingHours?: WorkingHourUncheckedCreateNestedManyWithoutDealershipInfoInput
  }

  export type DealershipInfoCreateOrConnectWithoutVisitBookingsInput = {
    where: DealershipInfoWhereUniqueInput
    create: XOR<DealershipInfoCreateWithoutVisitBookingsInput, DealershipInfoUncheckedCreateWithoutVisitBookingsInput>
  }

  export type UserCreateWithoutVisitBookingInput = {
    id?: string
    clerkUserId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    phone?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    savedCars?: UserSavedVehicleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVisitBookingInput = {
    id?: string
    clerkUserId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    phone?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    savedCars?: UserSavedVehicleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVisitBookingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVisitBookingInput, UserUncheckedCreateWithoutVisitBookingInput>
  }

  export type VehicleCreateWithoutVisitsInput = {
    id?: string
    category?: string
    model: string
    year: number
    price: Decimal | DecimalJsLike | number | string
    color: string
    featured?: boolean
    seats?: number | null
    doors?: number | null
    engineSize?: string | null
    mileage: number
    description?: string | null
    images?: VehicleCreateimagesInput | string[]
    optionals?: VehicleCreateoptionalsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: string
    fuelType?: string
    transmission?: string
    vehicleBrand?: string | null
    vehicleType?: string | null
    savedBy?: UserSavedVehicleCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutVisitsInput = {
    id?: string
    category?: string
    model: string
    year: number
    price: Decimal | DecimalJsLike | number | string
    color: string
    featured?: boolean
    seats?: number | null
    doors?: number | null
    engineSize?: string | null
    mileage: number
    description?: string | null
    images?: VehicleCreateimagesInput | string[]
    optionals?: VehicleCreateoptionalsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: string
    fuelType?: string
    transmission?: string
    vehicleBrand?: string | null
    vehicleType?: string | null
    savedBy?: UserSavedVehicleUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutVisitsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutVisitsInput, VehicleUncheckedCreateWithoutVisitsInput>
  }

  export type DealershipInfoUpsertWithoutVisitBookingsInput = {
    update: XOR<DealershipInfoUpdateWithoutVisitBookingsInput, DealershipInfoUncheckedUpdateWithoutVisitBookingsInput>
    create: XOR<DealershipInfoCreateWithoutVisitBookingsInput, DealershipInfoUncheckedCreateWithoutVisitBookingsInput>
    where?: DealershipInfoWhereInput
  }

  export type DealershipInfoUpdateToOneWithWhereWithoutVisitBookingsInput = {
    where?: DealershipInfoWhereInput
    data: XOR<DealershipInfoUpdateWithoutVisitBookingsInput, DealershipInfoUncheckedUpdateWithoutVisitBookingsInput>
  }

  export type DealershipInfoUpdateWithoutVisitBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
    workingHours?: WorkingHourUpdateManyWithoutDealershipInfoNestedInput
  }

  export type DealershipInfoUncheckedUpdateWithoutVisitBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
    workingHours?: WorkingHourUncheckedUpdateManyWithoutDealershipInfoNestedInput
  }

  export type UserUpsertWithoutVisitBookingInput = {
    update: XOR<UserUpdateWithoutVisitBookingInput, UserUncheckedUpdateWithoutVisitBookingInput>
    create: XOR<UserCreateWithoutVisitBookingInput, UserUncheckedCreateWithoutVisitBookingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVisitBookingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVisitBookingInput, UserUncheckedUpdateWithoutVisitBookingInput>
  }

  export type UserUpdateWithoutVisitBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedCars?: UserSavedVehicleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVisitBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedCars?: UserSavedVehicleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VehicleUpsertWithoutVisitsInput = {
    update: XOR<VehicleUpdateWithoutVisitsInput, VehicleUncheckedUpdateWithoutVisitsInput>
    create: XOR<VehicleCreateWithoutVisitsInput, VehicleUncheckedCreateWithoutVisitsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutVisitsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutVisitsInput, VehicleUncheckedUpdateWithoutVisitsInput>
  }

  export type VehicleUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    savedBy?: UserSavedVehicleUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    color?: StringFieldUpdateOperationsInput | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    doors?: NullableIntFieldUpdateOperationsInput | number | null
    engineSize?: NullableStringFieldUpdateOperationsInput | string | null
    mileage?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    images?: VehicleUpdateimagesInput | string[]
    optionals?: VehicleUpdateoptionalsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    fuelType?: StringFieldUpdateOperationsInput | string
    transmission?: StringFieldUpdateOperationsInput | string
    vehicleBrand?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    savedBy?: UserSavedVehicleUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type DealershipInfoCreateWithoutWorkingHoursInput = {
    id?: string
    name?: string
    address?: string
    phone?: string | null
    email?: string | null
    website?: string | null
    socialMedia?: string | null
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workingHourId: string
    visitBookings?: VisitBookingCreateNestedManyWithoutDealershipInfoInput
  }

  export type DealershipInfoUncheckedCreateWithoutWorkingHoursInput = {
    id?: string
    name?: string
    address?: string
    phone?: string | null
    email?: string | null
    website?: string | null
    socialMedia?: string | null
    logoUrl?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workingHourId: string
    visitBookings?: VisitBookingUncheckedCreateNestedManyWithoutDealershipInfoInput
  }

  export type DealershipInfoCreateOrConnectWithoutWorkingHoursInput = {
    where: DealershipInfoWhereUniqueInput
    create: XOR<DealershipInfoCreateWithoutWorkingHoursInput, DealershipInfoUncheckedCreateWithoutWorkingHoursInput>
  }

  export type DealershipInfoUpsertWithoutWorkingHoursInput = {
    update: XOR<DealershipInfoUpdateWithoutWorkingHoursInput, DealershipInfoUncheckedUpdateWithoutWorkingHoursInput>
    create: XOR<DealershipInfoCreateWithoutWorkingHoursInput, DealershipInfoUncheckedCreateWithoutWorkingHoursInput>
    where?: DealershipInfoWhereInput
  }

  export type DealershipInfoUpdateToOneWithWhereWithoutWorkingHoursInput = {
    where?: DealershipInfoWhereInput
    data: XOR<DealershipInfoUpdateWithoutWorkingHoursInput, DealershipInfoUncheckedUpdateWithoutWorkingHoursInput>
  }

  export type DealershipInfoUpdateWithoutWorkingHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
    visitBookings?: VisitBookingUpdateManyWithoutDealershipInfoNestedInput
  }

  export type DealershipInfoUncheckedUpdateWithoutWorkingHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    socialMedia?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workingHourId?: StringFieldUpdateOperationsInput | string
    visitBookings?: VisitBookingUncheckedUpdateManyWithoutDealershipInfoNestedInput
  }

  export type VisitBookingCreateManyDealershipInfoInput = {
    id?: string
    userId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicleId?: string | null
  }

  export type WorkingHourCreateManyDealershipInfoInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    isOpen?: boolean
    openTime: string
    closeTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitBookingUpdateWithoutDealershipInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVisitBookingNestedInput
    Vehicle?: VehicleUpdateOneWithoutVisitsNestedInput
  }

  export type VisitBookingUncheckedUpdateWithoutDealershipInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VisitBookingUncheckedUpdateManyWithoutDealershipInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkingHourUpdateWithoutDealershipInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkingHourUncheckedUpdateWithoutDealershipInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkingHourUncheckedUpdateManyWithoutDealershipInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSavedVehicleCreateManyUserInput = {
    id?: string
    vehicleId: string
    savedAt?: Date | string
  }

  export type VisitBookingCreateManyUserInput = {
    id?: string
    dealershipInfoId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicleId?: string | null
  }

  export type UserSavedVehicleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type UserSavedVehicleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSavedVehicleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitBookingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dealershipInfo?: DealershipInfoUpdateOneRequiredWithoutVisitBookingsNestedInput
    Vehicle?: VehicleUpdateOneWithoutVisitsNestedInput
  }

  export type VisitBookingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VisitBookingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSavedVehicleCreateManyVehicleInput = {
    id?: string
    userId: string
    savedAt?: Date | string
  }

  export type VisitBookingCreateManyVehicleInput = {
    id?: string
    userId: string
    dealershipInfoId: string
    visitDate: Date | string
    startTime: string
    endTime: string
    status?: $Enums.BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSavedVehicleUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedCarsNestedInput
  }

  export type UserSavedVehicleUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSavedVehicleUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitBookingUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dealershipInfo?: DealershipInfoUpdateOneRequiredWithoutVisitBookingsNestedInput
    user?: UserUpdateOneRequiredWithoutVisitBookingNestedInput
  }

  export type VisitBookingUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitBookingUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dealershipInfoId?: StringFieldUpdateOperationsInput | string
    visitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}