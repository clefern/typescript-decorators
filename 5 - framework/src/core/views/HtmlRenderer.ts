import { Model } from '../models/Model';
import { HasId } from '../models/Sync';

export abstract class HtmlRenderer<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};
  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  /**
   * We removed the abstract of this method cause if the children need it
   * they need to overwrite this method
   */
  protected eventsMap(): { [key: string]: () => void } {
    return {};
  }

  /**
   * this method is for parent views that hold other instances implements that class
   * as well, and tell the render what children elements should be nested in the
   * parent instance
   */
  protected regionsToBeMapped(): { [key: string]: string } {
    return {};
  }

  private bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  private bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  private mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsToBeMapped();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  public render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
