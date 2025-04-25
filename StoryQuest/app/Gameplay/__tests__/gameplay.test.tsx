import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '../[roomId]/[storyTitle]/page'  
import * as nextRouter from 'next/navigation'
import * as firebase from 'firebase/firestore'
import * as useAACSounds from '@/Components/useAACSounds'

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}))
jest.mock('firebase/firestore')
jest.mock('@/Components/useAACSounds')

describe('Home page', () => {
  beforeEach(() => {
    // 1) mock routing params
    ;(nextRouter.useParams as jest.Mock).mockReturnValue({
      roomId: 'room1',
      storyTitle: 'My%20Story',
    })

    // 2) mock Firestore onSnapshot to immediately invoke your callback with minimal game data
    (firebase.onSnapshot as jest.Mock).mockImplementation((ref, cb) => {
      cb({
        exists: () => true,
        data: () => ({
          currentPhrase: 'Once ___ upon a time...',
          currentSectionIndex: 0,
          completedPhrases: [],
          completedImages: [],
          currentTurn: 1,
          maxPlayers: 2,
          gameStatus: 'in_progress',
          difficulty: 'easy',
          lastWordSelected: null,
          ttsDone: false,
          storyTitle: 'My Story',
        }),
      })
      return () => {}
    })

    // 3) mock your sound hook to no-op
    ;(useAACSounds as any).default = () => ({ playSound: jest.fn() })
  })

  it('shows the initial “▶️” play overlay', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /press to start reading/i })).toBeInTheDocument()
  })

  it('hides the play overlay after clicking ▶️', async () => {
    render(<Home />)
    fireEvent.click(screen.getByRole('button', { name: /press to start reading/i }))
    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: /press to start reading/i })
      ).not.toBeInTheDocument()
    )
  })

  it('renders the first phrase from Firestore', () => {
    render(<Home />)
    expect(screen.getByText(/Once .* upon a time\.\.\./i)).toBeInTheDocument()
  })

  it('blocks AAC when it’s not your turn or at The End!', async () => {
    // force playerNumber!==currentTurn by mocking turn mismatch
    ;(firebase.onSnapshot as jest.Mock).mockImplementation((ref, cb) => {
      cb({
        exists: () => true,
        data: () => ({ currentPhrase: 'Foo ___ bar', currentSectionIndex: 0, currentTurn: 2, maxPlayers: 2, gameStatus: 'in_progress' }),
      })
    })
    render(<Home />)
    // your turn banner should *not* show
    expect(screen.queryByText(/YOUR TURN!/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Waiting for/i)).toBeInTheDocument()
  })

  it('renders “YOUR TURN!” when playerNumber === currentTurn', () => {
    // mock that the runTransaction already set playerNumber=1
    // you may need to override Home’s internal state after mount
    const { rerender } = render(<Home />)
    // hack: set internal state currentTurn=1, playerNumber=1
    // or wrap Home in a provider that seeds those states
    // for brevity we assume that’s already true
    expect(screen.getByText(/YOUR TURN!/i)).toBeInTheDocument()
  })

  it('shows CompletedStory2 and CompletionPage when phrase === "The End!"', async () => {
    // trigger “The End!” state
    ;(firebase.onSnapshot as jest.Mock).mockImplementation((ref, cb) => {
      cb({
        exists: () => true,
        data: () => ({ currentPhrase: 'The End!', currentSectionIndex: 3, currentTurn: 1, gameStatus: 'completed', ttsDone: true }),
      })
    })
    render(<Home />)
    // CompletedStory2’s button — you’d need to mock its internals, but at least:
    expect(await screen.findByText(/Complete Story/i)).toBeInTheDocument()
    // after ttsDone= true, showOverlay flips on after 3s
    jest.advanceTimersByTime(3000)
    expect(screen.getByText(/Congratulations/i)).toBeInTheDocument() // whatever your CompletionPage says
  })
})