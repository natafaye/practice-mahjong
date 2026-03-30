import { describe, it, expect } from 'vitest'
import { getJokerSwapIndex } from '../getJokerSwapIndex'
import { GAP, type MahjongTileRow } from '../../types'
import { createJoker, createTile } from './testUtilities'
import { BAMS, DOTS } from '../generateTiles'

describe('getJokerSwapIndex', () => {
    it('should find the index of a Joker in a simple matching set', () => {
        const swapTile = createTile(BAMS, 5)
        const exposedTiles: MahjongTileRow = [
            createTile(BAMS, 5), 
            createTile(BAMS, 5), 
            createJoker()
        ]
        expect(getJokerSwapIndex(swapTile, exposedTiles)).toBe(2)
    })

    it('should find the index of a Joker when there are multiple sets separated by GAP', () => {
        const swapTile = createTile(DOTS, 8)
        const exposedTiles: MahjongTileRow = [
            createTile(BAMS, 2), createTile(BAMS, 2), createTile(BAMS, 2), GAP,
            createTile(DOTS, 8), createTile(DOTS, 8), createJoker(), GAP,
            createTile(BAMS, 9), createTile(BAMS, 9), createTile(BAMS, 9)
        ]
        expect(getJokerSwapIndex(swapTile, exposedTiles)).toBe(6)
    })

    it('should return -1 if there are no Jokers in the exposed tiles', () => {
        const swapTile = createTile(BAMS, 5)
        const exposedTiles: MahjongTileRow = [
            createTile(BAMS, 5), 
            createTile(BAMS, 5), 
            createTile(BAMS, 5), 
            createTile(BAMS, 5)
        ]
        expect(getJokerSwapIndex(swapTile, exposedTiles)).toBe(-1)
    })

    it('should return -1 if the Joker is present, but in a set that does NOT match the swap tile', () => {
        const swapTile = createTile(DOTS, 1)
        const exposedTiles: MahjongTileRow = [
            createTile(BAMS, 5), 
            createTile(BAMS, 5), 
            createJoker()
        ]
        expect(getJokerSwapIndex(swapTile, exposedTiles)).toBe(-1)
    })

    it('should return -1 if the swap tile matches a different set than the one containing the Joker', () => {
        const swapTile = createTile(BAMS, 2)
        const exposedTiles: MahjongTileRow = [
            createTile(BAMS, 2), createTile(BAMS, 2), createTile(BAMS, 2), GAP,
            createTile(DOTS, 8), createTile(DOTS, 8), createJoker()
        ]
        expect(getJokerSwapIndex(swapTile, exposedTiles)).toBe(-1)
    })

    it('should return -1 if the exposed tiles array is empty', () => {
        const swapTile = createTile(BAMS, 5)
        const exposedTiles: MahjongTileRow = []
        
        expect(getJokerSwapIndex(swapTile, exposedTiles)).toBe(-1)
    })
})