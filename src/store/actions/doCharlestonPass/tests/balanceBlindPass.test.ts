import { expect, describe, it } from 'vitest'
import { balanceBlindPass } from '../balanceBlindPass'
import { createTile } from '../../../../_shared/tests/testUtilities'
import { DOTS } from '../../../../constants'
import type { MahjongTile } from '../../../../types'

describe('balanceBlindPass', () => {
    const createPassing = (counts: number[]) => {
        return counts.map(count => Array.from({ length: count }, () => createTile(DOTS, 1)))
    }

    const getCounts = (passing: MahjongTile[][]) => passing.map(p => p.length)

    describe('Four player scenarios passing LEFT', () => {
        it('Passing 1 tile, 3 tiles, 1 tiles, 2 tiles (LEFT)', () => {
            const passing = createPassing([1, 3, 1, 2])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([3, 1, 2, 1])
        })

        it('Passing 2 tiles, 2 tiles, 2 tiles, 2 tiles (LEFT)', () => {
            const passing = createPassing([2, 2, 2, 2])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([2, 2, 2, 2])
        })

        it('Passing 3 tiles, 3 tiles, 3 tiles, 3 tiles (LEFT)', () => {
            const passing = createPassing([3, 3, 3, 3])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([3, 3, 3, 3])
        })

        it('Passing 0 tiles, 1 tiles, 2 tiles, 3 tiles (LEFT)', () => {
            const passing = createPassing([0, 1, 2, 3])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([1, 2, 3, 0])
        })

        it('Passing 1 tiles, 0 tiles, 3 tiles, 0 tiles (LEFT)', () => {
            const passing = createPassing([1, 0, 3, 0])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([0, 3, 0, 1])
        })
    })

    describe('Four player scenarios passing RIGHT', () => {
        it('Passing 1 tile, 3 tiles, 1 tiles, 2 tiles (RIGHT)', () => {
            const passing = createPassing([1, 3, 1, 2])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([2, 1, 3, 1])
        })

        it('Passing 2 tiles, 2 tiles, 2 tiles, 2 tiles (RIGHT)', () => {
            const passing = createPassing([2, 2, 2, 2])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([2, 2, 2, 2])
        })

        it('Passing 3 tiles, 3 tiles, 3 tiles, 3 tiles (RIGHT)', () => {
            const passing = createPassing([3, 3, 3, 3])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([3, 3, 3, 3])
        })

        it('Passing 0 tiles, 1 tiles, 2 tiles, 3 tiles (RIGHT)', () => {
            const passing = createPassing([0, 1, 2, 3])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([3, 0, 1, 2])
        })

        it('Passing 1 tiles, 0 tiles, 3 tiles, 0 tiles (RIGHT)', () => {
            const passing = createPassing([1, 0, 3, 0])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([0, 1, 0, 3])
        })
    })

    describe('Two player scenarios passing LEFT', () => {
        it('Passing 3 tiles, 0 tiles', () => {
            const passing = createPassing([3, 0])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([0, 3])
        })

        it('Passing 2 tiles, 3 tiles', () => {
            const passing = createPassing([2, 3])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([3, 2])
        })

        it('Passing 3 tiles, 3 tiles', () => {
            const passing = createPassing([3, 3])
            balanceBlindPass(passing, 'LEFT')
            expect(getCounts(passing)).toEqual([3, 3])
        })
    })

    describe('Two player scenarios passing RIGHT', () => {
        it('Passing 3 tiles, 0 tiles (RIGHT)', () => {
            const passing = createPassing([3, 0])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([0, 3])
        })

        it('Passing 2 tiles, 3 tiles (RIGHT)', () => {
            const passing = createPassing([2, 3])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([3, 2])
        })

        it('Passing 3 tiles, 3 tiles (RIGHT)', () => {
            const passing = createPassing([3, 3])
            balanceBlindPass(passing, 'RIGHT')
            expect(getCounts(passing)).toEqual([3, 3])
        })
    })
})
