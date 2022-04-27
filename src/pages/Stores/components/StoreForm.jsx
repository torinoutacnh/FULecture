import useLocales from 'hooks/useLocales';
import { CardTitle } from 'pages/Products/components/Card';
import { InputField, SelectField, SwitchField, TimePickerField } from 'components/form';
import { Card, Grid, Typography } from '@material-ui/core';

const StoreForm = () => {
  const fieldSetting = {
    fullWidth: true,
    size: 'small'
  };
  const { translate } = useLocales();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <SwitchField
          name="is_available"
          label={<Typography variant="caption">{translate('common.available')}</Typography>}
        />
      </Grid>
      <Grid item xs={12} sm={6} />
      <Grid item xs={12} sm={6}>
        <InputField
          {...fieldSetting}
          required
          name="store_code"
          label={translate('pages.stores.table.storeCode')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          {...fieldSetting}
          name="name"
          required
          label={translate('pages.stores.table.name')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          {...fieldSetting}
          name="short_name"
          label={translate('pages.stores.table.shortName')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectField {...fieldSetting} name="type" label={translate('pages.stores.table.type')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TimePickerField
          {...fieldSetting}
          name="open_time"
          label={translate('pages.stores.table.openTime')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TimePickerField
          {...fieldSetting}
          name="close_time"
          label={translate('pages.stores.table.closeTime')}
        />
      </Grid>
    </Grid>
  );
};

export default StoreForm;
