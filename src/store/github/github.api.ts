import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IUsers, ServerResponse,IRepo } from '../../models/models';
export const githubApi = createApi({
    reducerPath: 'github/Api',
    baseQuery: fetchBaseQuery ({
        baseUrl:'https://api.github.com/'
    }),
    endpoints: build => ({
        searchUsers: build.query<IUsers[],string>({
            query: (search:string) => ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page:10,
                }
            }),
            transformResponse:(response:ServerResponse<IUsers>)=> response.items
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (user:string) => ({
                url:`users/${user}/repos`
            })
        })
    })
});
export const { useSearchUsersQuery,useLazyGetUserReposQuery } = githubApi;