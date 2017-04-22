export interface LifeCycle {
    preload(): void;
    create(): void;
    update(): void;
}