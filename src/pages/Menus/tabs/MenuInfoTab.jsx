import { Box, Grid } from '@material-ui/core';
import { InputField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { Card, CardTitle } from '../../Products/components/Card';

const MenuInfoTab = ({ onSubmit }) => (
  <Box>
    <Card>
      <CardTitle>Thông tin Menu</CardTitle>
      <Grid spacing={2} container>
        <Grid item xs={12} sm={6}>
          <InputField fullWidth size="small" name="menu_name" label="Tên menu" />
        </Grid>
      </Grid>
      <Box textAlign="right" mt={2}>
        <LoadingAsyncButton size="small" onClick={onSubmit} variant="contained">
          Cập nhật
        </LoadingAsyncButton>
      </Box>
    </Card>
  </Box>
);

export default MenuInfoTab;
