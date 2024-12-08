import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { RegistrationRequiredDto, TokenResponseDto } from './auth-response.dto';

export const ApiSocialAuthResponse = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiExtraModels(TokenResponseDto, RegistrationRequiredDto)(
      target,
      propertyKey,
      descriptor,
    );
    ApiOkResponse({
      schema: {
        oneOf: [
          { $ref: getSchemaPath(TokenResponseDto) },
          { $ref: getSchemaPath(RegistrationRequiredDto) },
        ],
      },
    })(target, propertyKey, descriptor);
  };
};
