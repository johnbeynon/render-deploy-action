import type * as RMOAS from '../rmoas.types';
export declare type ResponseExamples = {
    status: string;
    mediaTypes: Record<string, RMOAS.MediaTypeObject>;
}[];
/**
 * Retrieve a collection of response examples keyed, by their media type.
 *
 * @param operation Operation to retrieve response examples for.
 */
export default function getResponseExamples(operation: RMOAS.OperationObject): ResponseExamples;
