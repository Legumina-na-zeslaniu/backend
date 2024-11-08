import { registerEnumType } from '@nestjs/graphql';
import { ClassificationType } from '../ai-classifier/enum/classification-type.enum';

export const registerEnums = () => {
  registerEnumType(ClassificationType, { name: 'ClassificationType' });
};
