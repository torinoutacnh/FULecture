/* eslint-disable no-plusplus */
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import Label from 'components/Label';
import faker from 'faker';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { getCbn } from 'utils/utils';
import { AutoCompleteField, InputField } from '../../../components/form';

const VariantForm = ({ name, updateMode: defaultMode = true }) => {
  const { control, setValue, getValues, reset } = useFormContext();
  const { fields: childProducts, remove: removeChildProd } = useFieldArray({
    control,
    name: 'child_products'
  });
  const [_updateMode, setUpdateMode] = useState(defaultMode);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    fields: variants,
    append: push,
    remove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const variantsWatch = useWatch({
    name: 'variants'
  });

  const arrStr = variantsWatch
    ?.filter(({ values }) => values && values?.length !== 0)
    .map(({ values = [] }) => values.join('-'))
    .join('-');

  useEffect(() => {
    const variantArr = variantsWatch?.reduce((acc, { values = [] }) => [...acc, values], []);
    const prodComb = getCbn(...(variantArr ?? []));
    // [[a,c][b,c]]
    const generateDefaultProductChilds = prodComb.map((atts = []) => ({
      id: faker.datatype.uuid(),
      atts,
      is_available: true,
      code: `${atts.join('')}`,
      product_name: `${atts.join('-')}`
    }));

    if (_updateMode) {
      setValue('child_products', generateDefaultProductChilds);
    }

    // HACKS set new value for child_products
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrStr, _updateMode]);

  const buildVariantTable = () => (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">S???n ph???m</TableCell>
            <TableCell align="center">M?? s???n ph???m</TableCell>
            <TableCell align="center">Thu???c t??nh</TableCell>
            <TableCell align="center">H??nh ?????ng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {childProducts.map(({ atts, product_name, id }, index) => (
            <TableRow key={id}>
              <TableCell align="left">
                <InputField name={`child_products.${index}.product_name`} fullWidth size="small" />
              </TableCell>
              <TableCell>
                <InputField name={`child_products.${index}.code`} fullWidth size="small" />
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  {atts?.map((att) => <Label key={`${id}-${atts?.join('-')}`}>{att}</Label>) ?? '-'}
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="error" onClick={() => removeChildProd(index)}>
                  X??a
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Stack spacing={2}>
      <ConfirmDialog
        open={openConfirm}
        title="Thay ?????i t??y ch???n s??? ph???i x??a c??c t??y ch???n c??"
        onClose={() => {
          setOpenConfirm(false);
        }}
        onDelete={() => {
          setOpenConfirm(false);
          setUpdateMode(true);
        }}
      />
      {variants.map(({ optName, values }, optIndex) => (
        <Box key={`variant-${optIndex}`}>
          <Stack direction="row" spacing={2}>
            <InputField
              name={`variants.${optIndex}.optName`}
              size="small"
              disabled={!_updateMode}
              label="T??n t??y ch???n"
            />

            <AutoCompleteField
              disabled={!_updateMode}
              name={`variants.${optIndex}.values`}
              multiple
              size="small"
              options={values}
              fullWidth
              freeSolo
              label="T??y ch???n"
              placeholder={_updateMode && 'Nh???n Enter ????? th??m gi?? tr???'}
              getOptionLabel={(option) => option}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    size="small"
                    key={option}
                    variant="outlined"
                    label={option}
                    {...(!_updateMode ? {} : getTagProps({ index }))}
                  />
                ))
              }
            />

            <IconButton
              disabled={optIndex === 0 || !_updateMode}
              onClick={() => remove(optIndex)}
              size="small"
              aria-label="delete"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Box>
      ))}
      <Divider />
      <span>
        {!_updateMode && (
          <Button onClick={() => setOpenConfirm(true)} variant="outlined" disabled={_updateMode}>
            Edit
          </Button>
        )}
        {_updateMode && (
          <Button
            onClick={() =>
              push({
                optName: '',
                values: []
              })
            }
            variant="outlined"
          >
            Th??m t??y ch???n
          </Button>
        )}
      </span>
      <Box>
        <Typography variant="subtitle2">Danh s??ch</Typography>
        {buildVariantTable()}
      </Box>
    </Stack>
  );
};

export default VariantForm;
