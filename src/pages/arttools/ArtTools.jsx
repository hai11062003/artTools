import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Alert,
  Switch,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

function ArtTools() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingArt, setEdittingArt] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "artName",
      key: "artName",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "GlassSurface",
      dataIndex: "glassSurface",
      key: "glassSurface",
      align: "center",
      render: (text) => (
        <span
          style={{
            color: text ? "green" : "black",
            fontWeight: text ? "bold" : "normal",
          }}
        >
          {text ? "True" : "False"}
        </span>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text) => <img src={text} width={100} alt="Art" />,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      align: "center",
    },
    {
      title: "LimitedTimeDeal",
      dataIndex: "limitedTimeDeal",
      key: "limitedTimeDeal",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id, record) => (
        <>
          <Button type="link" onClick={() => handleEditArt(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the art"
            onConfirm={() => handleDeleteArt(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  async function fetchArt() {
    try {
      const response = await axios.get(
        "https://662a6bda67df268010a3dc8f.mockapi.io/ArtTools"
      );

      setDataSource(response.data);
    } catch (error) {
      console.error("Failed to fetch arts:", error);
    }
  }

  const handleShowModal = () => {
    setIsOpen(true);
  };

  const handleHideModal = () => {
    setIsOpen(false);
    setEdittingArt(null);
    form.resetFields();
  };

  const handleDeleteArt = async (id) => {
    try {
      await axios.delete(
        `https://662a6bda67df268010a3dc8f.mockapi.io/ArtTools/${id}`
      );
      const listAfterDelete = dataSource.filter((art) => art.id !== id);
      setDataSource(listAfterDelete);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      console.error("Failed to delete art:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingArt) {
        await axios.put(
          `https://662a6bda67df268010a3dc8f.mockapi.io/ArtTools/${editingArt.id}`,
          values
        );
        const updatedDataSource = dataSource.map((art) =>
          art.id === editingArt.id ? { ...art, ...values } : art
        );
        setDataSource(updatedDataSource);
      } else {
        const response = await axios.post(
          "https://662a6bda67df268010a3dc8f.mockapi.io/ArtTools",
          values
        );
        setDataSource([...dataSource, response.data]);
      }
      setIsOpen(false);
      form.resetFields();
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const handleEditArt = (art) => {
    setEdittingArt(art);
    form.setFieldsValue(art);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchArt();
  }, []);

  return (
    <div>
      {showSuccessAlert && (
        <Alert
          message="Art saved successfully!"
          type="success"
          showIcon
          closable
        />
      )}
      <Button type="primary" onClick={handleShowModal}>
        Add new art
      </Button>
      <Table columns={columns} dataSource={dataSource} rowKey="id" />

      <Modal
        open={isOpen}
        title={editingArt ? "Edit art" : "Add new art"}
        onCancel={handleHideModal}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="artName"
            rules={[
              { required: true, message: "Please input art's name!" },
              {
                pattern: /^[A-Z][A-Za-z\s]*$/,
                message:
                  "Name must start with an uppercase letter and only contain letters and spaces!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input price!" },
              () => ({
                validator(_, value) {
                  if (value >= 10) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Price must be at least 10!")
                  );
                },
              }),
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="GlassSurface"
            name="glassSurface"
            valuePropName="checked"
            initialValue={false}
            rules={[
              { required: true, message: "Please input art's GlassSurface!" },
            ]}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please input art's Brand!" }]}
          >
            <Select>
              <Select.Option value="KingArt">KingArt</Select.Option>
              <Select.Option value="Color Splash">Color Splash</Select.Option>
              <Select.Option value="Edding">Edding </Select.Option>
              <Select.Option value="Arteza">Arteza</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              { required: true, message: "Please input image URL!" },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ArtTools;
