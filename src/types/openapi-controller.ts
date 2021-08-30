import {components, operations} from "./petstore";

export interface OpenApiOperation {
    parameters?: {
        query: Record<string, string>
    };
    requestBody: {
        content: {
            "application/json": Record<string, any>
        }
    };
    responses: Record<string | number, {
        headers?: Record<string, string>,
        content?: {
            "application/json": Record<string, any>
        }
    }>;
}

export type ExtractJson<T extends {content?: {"application/json": any}}> = T['content']['application/json'];
type ExtractGeneric<Type> = Type extends Record<string | number, infer X> ? X : never

type T2 = ExtractGeneric<operations['createPets']['responses']>

type Controller<T extends OpenApiOperation> = (body: ExtractJson<T['requestBody']>) => ExtractJson<ExtractGeneric<T['responses']>>;

const test: Controller<operations['createPets']> = (body => {
    // TODO: use ajv here
    return {
        message: 'test message',
        code: 400
    }
});