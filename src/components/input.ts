import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class KInput extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: String }) type = 'text';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) placeholder = '';
  @property({ type: String }) helperText = '';
  @property({ type: String }) error = '';

  @state() focused = false;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      margin-bottom: 16px;
    }

    .label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: var(--fitness-color-text, #1f2937);
      margin-bottom: 6px;
    }

    .input-wrapper {
      position: relative;
    }

    .input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--fitness-color-border, #d1d5db);
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.2s ease;
      background: var(--fitness-color-bg, #ffffff);
      color: var(--fitness-color-text, #111827);
    }

    .input:focus {
      outline: none;
      border-color: var(--fitness-color-primary, #10B981);
      box-shadow: 0 0 0 3px var(--fitness-color-primary-light, #A7F3D0);
    }

    .input:disabled {
      background: var(--fitness-color-disabled-bg, #f3f4f6);
      color: var(--fitness-color-disabled-text, #9ca3af);
      cursor: not-allowed;
    }

    .helper {
      font-size: 13px;
      margin-top: 6px;
      color: var(--fitness-color-helper, #4b5563);
    }

    .error {
      border-color: var(--fitness-color-error, #ef4444) !important;
    }

    .error-text {
      color: var(--fitness-color-error, #ef4444);
      font-size: 13px;
      margin-top: 6px;
    }
  `;

  render() {
    return html`
      ${this.label
        ? html`<label for="input" class="label">${this.label}${this.required ? ' *' : ''}</label>`
        : ''}

      <div class="input-wrapper">
        <input
          id="input"
          class=${`input ${this.error ? 'error' : ''}`}
          type=${this.type}
          name=${this.name}
          .value=${this.value}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          ?required=${this.required}
          @input=${this.onInput}
          @focus=${() => { this.focused = true; }}
          @blur=${() => { this.focused = false; }}
        />
      </div>

      ${this.error
        ? html`<div class="error-text" role="alert">${this.error}</div>`
        : this.helperText
          ? html`<div class="helper">${this.helperText}</div>`
          : ''}
    `;
  }

  onInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('input-changed', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value')) {
      const input = this.shadowRoot?.querySelector('input');
      if (input && (input as HTMLInputElement).value !== this.value) {
        (input as HTMLInputElement).value = this.value;
      }
    }
  }
}

customElements.define('k-input', KInput);

declare global {
  interface HTMLElementTagNameMap {
    'k-input': KInput;
  }
}
