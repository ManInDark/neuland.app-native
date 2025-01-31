/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
    type Exams,
    type Grade,
    type Lecturers,
    type PersData,
    type Rooms,
    type ThiNews,
    type TimetableResponse,
} from '@/types/thi-api'

import { APIError, AnonymousAPIClient } from './anonymous-api'
import { callWithSession } from './thi-session-handler'

export interface PersonalData {
    persdata?: {
        stg?: string
        po_url?: string
    }
}

/**
 * Client for accessing the API as a particular user.
 *
 * @see {@link https://github.com/neuland-ingolstadt/neuland.app/blob/develop/docs/thi-rest-api.md}
 */
export class AuthenticatedAPIClient extends AnonymousAPIClient {
    private readonly sessionHandler: any

    constructor() {
        super()

        this.sessionHandler = callWithSession
    }

    /**
     * Performs an authenticated request against the API
     * @param {object} params Request data
     * @returns {object}
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    async requestAuthenticated(params: object): Promise<any> {
        console.debug(params)
        return this.sessionHandler(async (session: any) => {
            const res = await this.request({
                session,
                ...params,
            })
            // old status format
            if (res.status !== 0) {
                throw new APIError(res.status, res.data)
            }
            // new status format
            if (res.data[0] !== 0) {
                throw new APIError(res.data[0], res.data[1])
            }

            return res.data[1]
        })
    }

    /**
     * Fetches the personal data of the user
     * @returns {Promise<object>} Promise that resolves with the personal data
     */
    async getPersonalData(): Promise<PersData> {
        const res = await this.requestAuthenticated({
            service: 'thiapp',
            method: 'persdata',
            format: 'json',
        })

        return res
    }

    /**
     * Fetches the timetable for a specific date
     * @param {Date} date Date to fetch the timetable for
     * @param {boolean} detailed Whether to include detailed information about the lectures
     * @returns {Promise<TimetableResponse>} Promise that resolves with the timetable
     */
    async getTimetable(
        date: Date,
        detailed = false
    ): Promise<TimetableResponse> {
        try {
            const res = await this.requestAuthenticated({
                service: 'thiapp',
                method: 'stpl',
                format: 'json',
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                details: detailed ? 1 : 0,
            })

            return {
                semester: res[0],
                holidays: res[1],
                timetable: res[2],
            }
        } catch (e: any) {
            // when the user did not select any classes, the timetable returns 'Query not possible'
            if (e.data === 'Query not possible') {
                return {
                    timetable: [],
                    holidays: [],
                    semester: [],
                }
            } else {
                throw e
            }
        }
    }

    /**
     * Fetches the exams for the current semester
     * @returns {Promise<Exams[]>} Promise that resolves with the exams
     */
    async getExams(): Promise<Exams[]> {
        try {
            const res = await this.requestAuthenticated({
                service: 'thiapp',
                method: 'exams',
                format: 'json',
                modus: '1', // what does this mean? if only we knew
            })

            if (!Array.isArray(res)) {
                throw new Error('Response is not an array')
            }

            return res
        } catch (e: any) {
            // when you have no exams the API sometimes returns "No exam data available"
            if (
                e.data === 'No exam data available' ||
                e.data === 'Query not possible'
            ) {
                return []
            } else {
                throw e
            }
        }
    }

    /**
     * Fetches the users grades
     * @returns {Promise<Grade[]>} Promise that resolves with the grades
     */
    async getGrades(): Promise<Grade[]> {
        const res = await this.requestAuthenticated({
            service: 'thiapp',
            method: 'grades',
            format: 'json',
        })

        return res
    }

    /**
     * Fetches the free rooms for a specific date
     * @param {Date} date Date to fetch the room availability for
     */
    async getFreeRooms(date: Date): Promise<Rooms[]> {
        const res = await this.requestAuthenticated({
            service: 'thiapp',
            method: 'rooms',
            format: 'json',
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        })
        return res
    }

    /**
     * Fetches the lecturers for the current semester
     * @returns {Promise<Lecturers[]>} Promise that resolves with the lecturers
     */
    async getPersonalLecturers(): Promise<Lecturers[]> {
        const res = await this.requestAuthenticated({
            service: 'thiapp',
            method: 'stpllecturers',
            format: 'json',
        })

        return res
    }

    /**
     * Fetches the lecturers for a specific range of characters
     * @param {string} from Single character indicating where to start listing the lecturers
     * @param {string} to Single character indicating where to end listing the lecturers
     */
    async getLecturers(from: string, to: string): Promise<Lecturers[]> {
        const res = await this.requestAuthenticated({
            service: 'thiapp',
            method: 'lecturers',
            format: 'json',
            from,
            to,
        })

        return res
    }

    /**
     * Fetches the latest thi news
     * @returns {Promise<ThiNews[]>} Promise that resolves with the news
     */
    async getThiNews(): Promise<ThiNews[]> {
        const res = await this.requestAuthenticated({
            service: 'thiapp',
            method: 'thinews',
            format: 'json',
        })

        return res
    }
}

export default new AuthenticatedAPIClient()
