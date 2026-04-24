import { expect, describe, it } from 'vitest'
import { balanceCourtesyPass } from '../balanceCourtesyPass'
import { createTile } from '../../../../_shared/tests/testUtilities'
import { DOTS } from '../../../../constants'
import type { MahjongTile } from '../../../../types'

describe('balanceCourtesyPass', () => {
    const createPassing = (counts: number[]) => {
        return counts.map(count => Array.from({ length: count }, () => createTile(DOTS, 1)))
    }

    const getCounts = (passing: MahjongTile[][]) => passing.map(p => p.length)

    describe('Four player scenarios', () => {
        it('Passing [2, 3, 1, 0] should produce [1, 0, 2, 3]', () => {
            const passing = createPassing([2, 3, 1, 0])
            balanceCourtesyPass(passing, 'OVER')
            expect(getCounts(passing)).toEqual([1, 0, 2, 3])
        })
    })

    describe('Two player scenarios', () => {
        it('Passing [1, 3] should produce [3, 1]', () => {
            const passing = createPassing([1, 3])
            balanceCourtesyPass(passing, 'OVER')
            expect(getCounts(passing)).toEqual([3, 1])
        })
    })
})
