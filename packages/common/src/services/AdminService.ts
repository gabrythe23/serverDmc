/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserChangeTypeRequestDto } from '../models/UserChangeTypeRequestDto';
import type { UserCreateRequestDto } from '../models/UserCreateRequestDto';
import type { UserCreateResponseDto } from '../models/UserCreateResponseDto';
import type { UserForceNewPasswordRequestDto } from '../models/UserForceNewPasswordRequestDto';
import type { UserUpdateRequestDto } from '../models/UserUpdateRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminService {

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
