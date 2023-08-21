/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';
import type { MeCompanyResponseDto } from './MeCompanyResponseDto';
import type { Type } from './Type';

export type MeResponseDto = {
    id: string;
    email: string;
    name: string;
    lastname: string;
    company?: MeCompanyResponseDto;
    birthday?: string;
    sex: Gender;
    image: string;
    type: Type;
    createdAt: string;
};

