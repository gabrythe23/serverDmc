/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';
import type { Type } from './Type';
import type { UserGetResponseCompanyDto } from './UserGetResponseCompanyDto';

export type UserGetResponseDto = {
    birthday?: string;
    company?: UserGetResponseCompanyDto;
    email: string;
    enabled: boolean;
    id: string;
    image: string;
    lastLogin?: string;
    lastname: string;
    name: string;
    sex: Gender;
    type: Type;
    updatedAt: string;
    createdAt: string;
};

