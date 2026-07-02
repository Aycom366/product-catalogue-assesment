import { fireEvent, render, screen } from '@testing-library/react-native';

import { ProductCard } from '@/components/product-card';
import type { Product } from '@/types/product';

const product: Product = {
  id: 7,
  title: 'Fjallraven Backpack',
  price: 109.95,
  description: 'A durable backpack for everyday use.',
  category: "men's clothing",
  image: 'https://example.com/backpack.png',
  rating: { rate: 3.9, count: 120 },
};

describe('ProductCard', () => {
  it('renders the product title, price, and category', async () => {
    await render(<ProductCard product={product} onPress={jest.fn()} isFavorite={false} onToggleFavorite={jest.fn()} />);

    expect(screen.getByText('Fjallraven Backpack')).toBeTruthy();
    expect(screen.getByText('$109.95')).toBeTruthy();
    expect(screen.getByText("men's clothing")).toBeTruthy();
  });

  it('calls onPress when the card is tapped', async () => {
    const onPress = jest.fn();
    await render(<ProductCard product={product} onPress={onPress} isFavorite={false} onToggleFavorite={jest.fn()} />);

    fireEvent.press(screen.getByTestId('product-card-7'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleFavorite without triggering onPress when the favourite button is tapped', async () => {
    const onPress = jest.fn();
    const onToggleFavorite = jest.fn();
    await render(
      <ProductCard product={product} onPress={onPress} isFavorite={false} onToggleFavorite={onToggleFavorite} />,
    );

    fireEvent.press(screen.getByLabelText('Add to favourites'));

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onPress).not.toHaveBeenCalled();
  });
});
