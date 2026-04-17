import { expect, describe, it } from 'vitest'
import { addWallPass } from '../addWallPass'
import { createTile, createJoker } from '../../../shared/tests/testUtilities'
import { DOTS } from '../../../constants'
import type { MahjongTile } from '../../../types'

describe('addWallPass', () => {
    it('should take 3 tiles from the wall when no jokers are present', () => {
        const wall = [
            createTile(DOTS, 1),
            createTile(DOTS, 2),
            createTile(DOTS, 3),
            createTile(DOTS, 4),
        ]
        const initialWallIds = wall.map(t => t.id)
        const passing: MahjongTile[][] = []
        
        addWallPass(passing, wall)
        
        expect(passing[0]).toHaveLength(3)
        expect(passing[0].map(t => t.id)).toEqual([initialWallIds[0], initialWallIds[1], initialWallIds[2]])
        expect(wall).toHaveLength(1)
        expect(wall[0].id).toBe(initialWallIds[3])
    })

    it('should skip jokers and take the first 3 non-joker tiles', () => {
        const wall = [
            createJoker(),
            createTile(DOTS, 1),
            createJoker(),
            createTile(DOTS, 2),
            createTile(DOTS, 3),
            createTile(DOTS, 4),
        ]
        const initialWallIds = wall.map(t => t.id)
        const passing: MahjongTile[][] = []

        addWallPass(passing, wall)

        expect(passing[0]).toHaveLength(3)
        // Should take DOTS 1, 2, 3
        expect(passing[0].map(t => t.id)).toEqual([initialWallIds[1], initialWallIds[3], initialWallIds[4]])
        expect(wall).toHaveLength(3)
        // Should leave Joker, Joker, DOTS 4
        expect(wall.map(t => t.id)).toEqual([initialWallIds[0], initialWallIds[2], initialWallIds[5]])
    })

    it('should take consecutive non-joker tiles', () => {
        const wall = [
            createTile(DOTS, 1),
            createTile(DOTS, 2),
            createTile(DOTS, 3),
        ]
        const initialWallIds = wall.map(t => t.id)
        const passing: MahjongTile[][] = []

        addWallPass(passing, wall)

        expect(passing[0]).toHaveLength(3)
        expect(passing[0].map(t => t.id)).toEqual(initialWallIds)
        expect(wall).toHaveLength(0)
    })
})
