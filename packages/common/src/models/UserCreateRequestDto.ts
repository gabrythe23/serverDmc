/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';
import type { Type } from './Type';

export type UserCreateRequestDto = {
    birthday?: string;
    companyId?: string;
    password: string;
    email: string;
    lastname: string;
    name: string;
    sex: Gender;
    type: Type;
};

