import { Product } from "types/product";
import { Texts } from "types/registry/texts";

export const texts: Texts<Product> = {
  registryTitle: 'Товары',
  
  getTitle: item => item.name,
  getCreateTitle: () => 'Добавить товар',

  confirmRemove: {
    title: () => "Удалить товар",
    severalTitle: () => "Удалить товары",
    text: () => "Вы уверены, что хотите удалить товар?",
    severalText: () => "Вы уверены, что хотите удалить выбранные товары?",

    confirmButtonText: "Удалить"
  },

  removeError: {
    title: () => "Удаление невозможно",
    text: () => "Что-то пошло не так",
    alert: true
  },

  saveNotification: {
    title: create => create ? 'Создание товара' : 'Сохранение товара',
    text: create => create ? 'Товар успешно создан' : 'Данные товара успешно сохранены'
  },

  remove: {
    title: 'Удалить товар',
    groupTitle: 'Удалить выбранные',

    notification: {
      title: items => items.length > 1 ? 'Удаление товаров' : 'Удаление товара',
      text: items => items.length > 1 ? 'Выбранные товары успешно удалены' : 'Выбранный товар успешно удален'
    }
  }
}