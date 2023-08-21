/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';

export type UserUpdateRequestDto = {
    birthday?: string;
    email: string;
    lastname: string;
    name: string;
    sex: Gender;
};

