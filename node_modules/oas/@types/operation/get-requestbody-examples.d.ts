import type * as RMOAS from '../rmoas.types';
export declare type RequestBodyExamples = {
    mediaType: string;
    examples: any;
}[];
/**
 * Retrieve a collection of request body examples, keyed by their media type.
 *
 * @param operation Operation to retrieve requestBody examples for.
 */
export default function getRequestBodyExamples(operation: RMOAS.OperationObject): RequestBodyExamples;
