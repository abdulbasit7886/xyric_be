import { z } from "zod";
export declare const createItemSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
        status: z.ZodDefault<z.ZodEnum<{
            active: "active";
            inactive: "inactive";
            archived: "archived";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateItemSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        price: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
        status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            active: "active";
            inactive: "inactive";
            archived: "archived";
        }>>>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listItemSchema: z.ZodObject<{
    query: z.ZodObject<{
        search: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            active: "active";
            inactive: "inactive";
            archived: "archived";
        }>>;
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=item.validator.d.ts.map