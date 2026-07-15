type Payload = { rect: { top: number; left: number; width: number; height: number }; src: string };
type Listener = (payload: Payload | null) => void;

const listeners = new Set<Listener>();
let _current: Payload | null = null;

export const pageTransitionStore = {
  trigger(rect: { top: number; left: number; width: number; height: number }, src: string) {
    _current = { rect, src };
    listeners.forEach((l) => l(_current));
  },
  clear() {
    _current = null;
    listeners.forEach((l) => l(null));
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  },
  get isActive() {
    return _current !== null;
  },
};
