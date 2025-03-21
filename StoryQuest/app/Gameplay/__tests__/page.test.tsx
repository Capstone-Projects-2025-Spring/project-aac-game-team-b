jest.mock('../stories', () => ({
  __esModule: true,
  default: [
    {
      title: "The Garden Adventure",
      backgroundImage: "garden-background.webp",
      colorTheme: {
        backgroundColor: "#b4fcdc", // Add this
        buttonColor: "#63d2cb", // Add this
      },
      sections: [
        {
          phrase: "Look in the garden, there is a ___",
          words: {
            mouse: { image: "mouse.svg", x: 50, y: 80, effect: 'spin' },
            ladybug: { image: "ladybug.svg", x: 60, y: 90, effect: 'pulse' },
          },
        },
        {
          phrase: "Next, I see a ___",
          words: {
            apples: { image: "apples.svg", x: 80, y: 20, effect: 'fade' },
          },
        },
      ],
    },
  ],
}));

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';
import useSound from 'use-sound';

jest.mock('../stories', () => ({
  __esModule: true,
  default: [
    {
      title: "The Garden Adventure",
      backgroundImage: "garden-background.webp",
      colorTheme: {
        backgroundColor: "#b4fcdc", // Add this
        buttonColor: "#63d2cb", // Add this
      },
      sections: [
        {
          phrase: "Look in the garden, there is a ___",
          words: {
            mouse: { image: "mouse.svg", x: 50, y: 80, effect: 'spin' },
            ladybug: { image: "ladybug.svg", x: 60, y: 90, effect: 'pulse' },
          },
        },
        {
          phrase: "Next, I see a ___",
          words: {
            apples: { image: "apples.svg", x: 80, y: 20, effect: 'fade' },
          },
        },
      ],
    },
  ],
}));

jest.mock('../../Components/AACKeyboard', () => {
  return function DummyAACKeyboard({ onSelect, symbols }: { onSelect: (word: string) => void, symbols: Array<{ word: string }> }) {
    return (
      <div data-testid="aac-keyboard">
        {symbols.map((symbol: { word: string }) => (
          <button
            key={symbol.word}
            onClick={() => onSelect(symbol.word)}
            data-testid={`aac-button-${symbol.word}`}
          >
            {symbol.word}
          </button>
        ))}
        <button
          onClick={() => onSelect("invalid_word")}
          data-testid="aac-button-invalid"
        >
          invalid_word
        </button>
      </div>
    );
  };
});

jest.mock('use-sound', () => ({
  __esModule: true,
  default: jest.fn(() => [jest.fn()]),
}));

jest.mock('../../Components/TextToSpeech', () => {
  return function MockTextToSpeech({ text }: { text: string }) {
    return <div data-testid="text-to-speech">{text}</div>;
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByLabelText(/Select Story:/i)).toBeInTheDocument();
  });

  it('initializes with the first story', () => {
    render(<Home />);
    expect(screen.getByTestId('text-to-speech')).toHaveTextContent("Look in the garden, there is a ___");
  });

  it('allows story selection from dropdown', () => {
    render(<Home />);
    const select = screen.getByLabelText(/Select Story:/i);
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('The Garden Adventure');
  });

  it('handles word selection through AAC keyboard', async () => {
    render(<Home />);
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);
    expect(screen.getByTestId('text-to-speech')).toHaveTextContent("Next, I see a ___");
  });

  it('displays images with correct properties and effects', async () => {
    render(<Home />);
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);

    const mouseImage = await screen.findByRole('img', { name: /mouse/i });
    expect(mouseImage).toBeInTheDocument();
  });

  it('plays sound when a valid AAC word is selected', () => {
    const play = jest.fn();
    (useSound as jest.Mock).mockReturnValue([play]);
    render(<Home />);
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);
    expect(play).toHaveBeenCalled();
  });

  it('passes down the text to TextToSpeech', () => {
    render(<Home />);
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);
    expect(screen.getByTestId('text-to-speech')).toHaveTextContent("Next, I see a");
  });

  //Took this off becuase now the testing will be different from this component
  /*it('shows "The End!" when all sections are completed', async () => {
    render(<Home />);
    const mouseButton = screen.getByTestId('aac-button-mouse');
    fireEvent.click(mouseButton);
    const applesButton = await screen.findByTestId('aac-button-apples');
    fireEvent.click(applesButton);
    expect(screen.getByText("The End!")).toBeInTheDocument();
  });*/

  it('handles invalid word selection gracefully', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Home />);
    const invalidButton = screen.getByTestId('aac-button-invalid');
    fireEvent.click(invalidButton);
    expect(mockAlert).toHaveBeenCalledWith('Word "invalid_word" not found in current section!');
    mockAlert.mockRestore();
  });
});