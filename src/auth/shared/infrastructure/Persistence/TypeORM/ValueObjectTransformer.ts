import { NewableClass } from '../../../domain/value-objects/NewableClass';
import { Primitives, ValueObject } from '../../../domain/value-objects/ValueObject';

export const ValueObjectTransformer = <T extends Primitives>(ValueObject: NewableClass<ValueObject<any>>) => {
    return {
        to: (value: ValueObject<T>): T => value.value,
        from: (value: T): ValueObject<T> => new ValueObject(value)
    };
};
