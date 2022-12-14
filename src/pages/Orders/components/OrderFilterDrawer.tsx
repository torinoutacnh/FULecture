import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel,
  IconButton
} from '@material-ui/core';
import Scrollbar from 'components/Scrollbar';
import { RadioGroupField } from 'components/form';
import { ORDER_STATUS_OPTONS, PAYMENT_TYPE_OPTONS } from 'types/order';
import useLocales from 'hooks/useLocales';
// @types

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' }
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' }
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------

type OrderFilterProps = {
  onResetFilter: VoidFunction;
  onOpenFilter: VoidFunction;
  onCloseFilter: VoidFunction;
  isOpenFilter: boolean;
};

export default function OrderFilterDrawer({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter
}: OrderFilterProps) {
  const { translate } = useLocales();

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        {translate('common.filter')}
      </Button>

      <form autoComplete="off" noValidate>
        <Drawer
          anchor="right"
          open={isOpenFilter}
          onClose={onCloseFilter}
          PaperProps={{
            sx: { width: 280, border: 'none', overflow: 'hidden' }
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 1, py: 2 }}
          >
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              B??? l???c
            </Typography>
            <IconButton onClick={onCloseFilter}>
              <Icon icon={closeFill} width={20} height={20} />
            </IconButton>
          </Stack>

          <Divider />

          <Scrollbar>
            <Stack spacing={3} sx={{ p: 3 }}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  T??nh tr???ng h??a ????n
                </Typography>
                <FormGroup>
                  <RadioGroupField
                    options={ORDER_STATUS_OPTONS}
                    name="status"
                    // label="T??nh tr???ng h??a ????n"
                  />
                </FormGroup>
              </div>

              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Lo???i h??a ????n
                </Typography>
                <RadioGroupField
                  options={PAYMENT_TYPE_OPTONS}
                  name="paymentType"
                  //   label="Loai hoa don"
                />
              </div>
            </Stack>
          </Scrollbar>

          <Box sx={{ p: 3 }}>
            <Button
              fullWidth
              size="small"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onResetFilter}
              startIcon={<Icon icon={roundClearAll} />}
            >
              X??a b??? l???c
            </Button>
          </Box>
        </Drawer>
      </form>
    </>
  );
}
