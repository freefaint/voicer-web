import { Product } from '../../types/product';

export const ProductCard = ({ product, showText }: { product: Product, showText: boolean }) => {
  return  (
    <div className="Block Column JustifySpace App" style={{ backgroundImage: `url(${product.img})` }}>
      {showText && (
        <>
          <div className="Block Column">
            <div className="Block JustifySpace">
              <div className="Block Name">{product.name}</div>
              <div className="Block Eighteen">18+</div>
            </div>
            
            <div className="Block JustifyEnd">
              <div className="Block Price">{product.cost}</div>
            </div>
          </div>

          <div className="Block JustifySpace AlignCenter">
            <div className="Block Desc">{product.description}</div>
            <div className="Block Weight">{product.weight}</div>
          </div>
        </>
      )}
    </div>
  );
}
