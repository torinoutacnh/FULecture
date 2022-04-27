import { ProductTypeEnum, TProductMaster } from 'types/product';
import * as yup from 'yup';

export type UpdateProductForm = TProductMaster & {
  variants: {
    optName: string;
    values: string[];
  }[];
  hasVariant?: boolean;
};

export const DEFAULT_VALUES: UpdateProductForm = {
  code: 'TEST',
  product_name: 'Test sp',
  description: 'mo ta',
  product_type: 6,
  pic_url: '',
  hasVariant: true,
  seo_name: 'seo link',
  seo_key_words: 'seo keys',
  seo_description: 'seo des',
  is_available: true,
  cat_id: 44,
  tags: [],
  variants: [
    { optName: 'size', values: ['M', 'L'] },
    { optName: 'color', values: ['Red', 'Blue'] }
  ],
  child_products: []
};

export const validationSchema = yup.object({
  code: yup.string().required('Vui lòng nhập mã sản phẩm'),
  product_name: yup.string().required('Vui lòng nhập tên sản phẩm')
  // menus: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       price: yup.number('Nhập giá').required('Nhập giá'), // these constraints take precedence
  //       menuId: yup.number('Chọn menu').required('Chọn menu').typeError('Vui lòng chọn menu') // these constraints take precedence
  //     })
  //   )
  //   .required('Vui lòng chọn 1 bảng giá') // these constraints are shown if and only if inner constraints are satisfied
  //   .min(1, 'Ít nhất 1 bảng giá')
});
