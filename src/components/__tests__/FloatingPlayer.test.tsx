import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import FloatingPlayer from "../FloatingPlayer";

type EventHandler = (event: Event) => void;

let createdAudios: AudioMock[] = [];

const latestAudio = () => createdAudios.at(-1);

class AudioMock {
  public muted = false;
  public play = vi.fn().mockResolvedValue(undefined);
  public pause = vi.fn();
  private listeners = new Map<string, Set<EventHandler>>();

  constructor(public src: string) {
    createdAudios.push(this);
  }

  addEventListener = vi.fn((event: string, handler: EventHandler) => {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set<EventHandler>());
    }
    this.listeners.get(event)!.add(handler);
  });

  removeEventListener = vi.fn((event: string, handler: EventHandler) => {
    this.listeners.get(event)?.delete(handler);
  });

  trigger(event: string) {
    this.listeners.get(event)?.forEach((handler) => {
      handler(new Event(event));
    });
  }
}

const originalAudio = window.Audio;

beforeEach(() => {
  createdAudios = [];
  window.Audio = AudioMock as unknown as typeof Audio;
});

afterEach(() => {
  window.Audio = originalAudio;
  vi.clearAllMocks();
  cleanup();
});

describe("FloatingPlayer", () => {
  it("keeps playback paused when skipping while paused", async () => {
    render(<FloatingPlayer />);

    await waitFor(() => {
      expect(createdAudios).toHaveLength(1);
    });

    const nextButton = screen.getByLabelText("Play next track");
    await act(async () => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(createdAudios).toHaveLength(2);
    });

    expect(createdAudios[0].play).not.toHaveBeenCalled();
    const newestAudio = latestAudio();
    expect(newestAudio).toBeDefined();
    expect(newestAudio!.play).not.toHaveBeenCalled();
  });

  it("resumes playback automatically when skipping while playing", async () => {
    render(<FloatingPlayer />);

    await waitFor(() => {
      expect(createdAudios).toHaveLength(1);
    });

    const playButton = screen.getByLabelText("Play playback");
    await act(async () => {
      fireEvent.click(playButton);
    });

    let activeAudio: AudioMock | undefined;
    await waitFor(() => {
      const currentAudio = latestAudio();
      expect(currentAudio).toBeDefined();
      expect(currentAudio!.play).toHaveBeenCalled();
      activeAudio = currentAudio!;
    });

    const nextButton = screen.getByLabelText("Play next track");
    await act(async () => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      const currentAudio = latestAudio();
      expect(currentAudio).toBeDefined();
      expect(currentAudio).not.toBe(activeAudio);
      expect(currentAudio!.play).toHaveBeenCalled();
    });
  });
});
