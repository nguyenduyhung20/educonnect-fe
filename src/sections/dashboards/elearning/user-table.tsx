import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridToolbarExport
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { Card } from '@mui/material';
import { ClassApi } from '@/api/elearning/class';

const VISIBLE_FIELDS = ['name', 'id'];

const initialRows = [];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: '',
        age: '',
        sex: '',
        birthday: '',
        ssn: '',
        phone: '',
        address: '',
        account: null,
        isNew: true
      }
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Box
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Button
            sx={{ fontSize: 13, px: '12px', py: '7px' }}
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleClick}
          >
            Add record
          </Button>
        </Box>
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  );
}

export default function UserTable({ type }) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const resData = await ClassApi.getUserOfSchool(type);
      if (resData?.data) {
        setRows(resData?.data);
      }
    };

    fetchData();
  }, [type]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      const resData = await ClassApi.deleteUser(id);
      if (resData) {
        setRows(rows.filter((row) => row.id !== id));
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    updatedRow.userRole = type;
    try {
      let resData = null;
      if (!isNaN(updatedRow.id) && !isNaN(parseInt(updatedRow.id))) {
        resData = await ClassApi.updateUser(updatedRow);
      } else {
        resData = await ClassApi.createUser(updatedRow);
      }
      if (resData) {
        console.log(resData)
        setRows(
          rows.map((row) =>
            row.id === updatedRow.id ? { ...updatedRow, id: resData?.data?.id } : row
          )
        );
        return updatedRow;
      }
    } catch (error) {
      throw error;
    }
    return null;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columnsNormal = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 80,
      editable: false
    },
    {
      field: 'name',
      headerName: 'Họ và tên',
      type: 'string',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'birthday',
      headerName: 'Ngày sinh',
      type: 'date',
      width: 120,
      editable: true,
      valueGetter: (item) => new Date(item.value)
    },
    {
      field: 'sex',
      headerName: 'Giới tính',
      width: 80,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Nam', 'Nữ'],
      valueGetter: (item) => (item.value === 'male' ? 'Nam' : 'Nữ')
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      type: 'string',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      type: 'string',
      width: 140,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'ssn',
      headerName: 'CCCD',
      type: 'string',
      width: 160,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'account',
      headerName: 'Tên đăng nhập',
      type: 'string',
      width: 160,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueGetter: (item) =>
        typeof item.value === 'object' ? item.value?.username : item.value
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành động',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  const columnsStudent = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 80,
      editable: false
    },
    {
      field: 'name',
      headerName: 'Họ và tên',
      type: 'string',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'birthday',
      headerName: 'Ngày sinh',
      type: 'date',
      width: 120,
      editable: true,
      valueGetter: (item) => new Date(item.value)
    },
    {
      field: 'sex',
      headerName: 'Giới tính',
      width: 80,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Nam', 'Nữ'],
      valueGetter: (item) => (item.value === 'male' ? 'Nam' : 'Nữ')
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      type: 'string',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      type: 'string',
      width: 140,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'ssn',
      headerName: 'CCCD',
      type: 'string',
      width: 160,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'account',
      headerName: 'Tên đăng nhập',
      type: 'string',
      width: 160,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueGetter: (item) =>
        typeof item.value === 'object' ? item.value?.username : item.value
    },
    {
      field: 'parentId',
      headerName: 'ID phụ huynh',
      type: 'string',
      width: 100,
      align: 'center',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'parentName',
      headerName: 'Họ và tên phụ huynh',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: false
    },
    {
      field: 'parentPhone',
      headerName: 'Số điện thoại phụ huynh',
      type: 'string',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: false
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành động',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <Card>
      <Box
        sx={{
          height: 600,
          width: '100%'
        }}
      >
        <DataGrid
          // @ts-ignore
          columns={type === 'student' ? columnsStudent : columnsNormal}
          rows={rows}
          editMode="row"
          visibleFields={VISIBLE_FIELDS}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, showQuickFilter: true }
          }}
        />
      </Box>
    </Card>
  );
}
