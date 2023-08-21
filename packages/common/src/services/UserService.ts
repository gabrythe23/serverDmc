/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginationOrder } from '../models/PaginationOrder';
import type { UserChangePasswordRequestDto } from '../models/UserChangePasswordRequestDto';
import type { UserChangeTypeRequestDto } from '../models/UserChangeTypeRequestDto';
import type { UserCreateRequestDto } from '../models/UserCreateRequestDto';
import type { UserCreateResponseDto } from '../models/UserCreateResponseDto';
import type { UserForceNewPasswordRequestDto } from '../models/UserForceNewPasswordRequestDto';
import type { UserGetListRequestSort } from '../models/UserGetListRequestSort';
import type { UserGetListResponseDto } from '../models/UserGetListResponseDto';
import type { UserGetResponseDto } from '../models/UserGetResponseDto';
import type { UserUpdateRequestDto } from '../models/UserUpdateRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Change password
     * @param userId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static userControllerChangePassword(
        userId: string,
        requestBody: UserChangePasswordRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user/{userId}/password',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get user by id
     * @param userId
     * @returns UserGetResponseDto
     * @throws ApiError
     */
    public static userControllerGetUserById(
        userId: string,
    ): CancelablePromise<UserGetResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * Update user
     * @param userId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static userControllerUpdateUser(
        userId: string,
        requestBody: UserUpdateRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get all users
     * @param limit
     * @param skip
     * @param text
     * @param order
     * @param sort
     * @returns UserGetListResponseDto
     * @throws ApiError
     */
    public static userControllerGetAllUsers(
        limit: number = 20,
        skip?: number,
        text?: number,
        order?: PaginationOrder,
        sort?: UserGetListRequestSort,
    ): CancelablePromise<UserGetListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user',
            query: {
                'limit': limit,
                'skip': skip,
                'text': text,
                'order': order,
                'sort': sort,
            },
        });
    }

    /**
     * Force password reset
     * @param userId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static adminUserControllerForceNewPassword(
        userId: string,
        requestBody: UserForceNewPasswordRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admin/user/{userId}/force-password-reset',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Change user type
     * @param userId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static adminUserControllerChangeType(
        userId: string,
        requestBody: UserChangeTypeRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admin/user/{userId}/type',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create new user
     * @param requestBody
     * @returns UserCreateResponseDto
     * @throws ApiError
     */
    public static adminUserControllerCreateUser(
        requestBody: UserCreateRequestDto,
    ): CancelablePromise<UserCreateResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Toggle user active
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public static adminUserControllerToggleActive(
        userId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admin/user/{userId}/toggle-active',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * Update user
     * @param userId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static adminUserControllerUpdateUser(
        userId: string,
        requestBody: UserUpdateRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/user/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete user
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public static adminUserControllerDeleteUser(
        userId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

}
