import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

export class KButton extends LitElement {
  @property({ type: String }) variant: 'primary' | 'secondary' | 'danger' | 'outline' = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .primary {
      background: var(--fitness-color-primary, #10B981);
      color: white;
    }

    .primary:hover:not(:disabled) {
      background: #0d9c6e;
    }

    .secondary {
      background: var(--fitness-color-secondary, #6b7280);
      color: white;
    }

    .danger {
      background: var(--fitness-color-error, #ef4444);
      color: white;
    }

    .outline {
      background: transparent;
      color: var(--fitness-color-primary, #10B981);
      border: 1px solid var(--fitness-color-primary, #10B981);
    }

    .outline:hover:not(:disabled) {
      background: var(--fitness-color-primary-light, #A7F3D0);
    }
  `;

  render() {
    return html`
      <button
        class=${this.variant}
        ?disabled=${this.disabled || this.loading}
      >
        ${this.loading ? html`<span class="loader">↻</span>` : ''}
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('k-button', KButton);

declare global {
  interface HTMLElementTagNameMap {
    'k-button': KButton;
  }
}
