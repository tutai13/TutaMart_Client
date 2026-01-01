<template>
  <div class="container-fluid py-3 px-3 px-lg-4" style="font-size: 0.875rem">
    <!-- Page Title & Stats -->
    <div class="row g-3 mb-4 align-items-center">
      <div class="col-12 col-lg-6">
        <h3 class="fw-bold mb-1">Inventory Overview</h3>
        <p class="text-muted small mb-0">
          Manage stock levels, prices and product details.
        </p>
      </div>

      <div class="col-12 col-lg-6">
        <div class="row g-3">
          <div class="col-12 col-sm-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body py-3 px-4">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-currency-dollar text-success me-2"></i>
                  <small class="text-muted text-uppercase">Total Value</small>
                </div>
                <h5 class="fw-bold mb-0">$45,230.00</h5>
                <small class="text-success small">+12% from last month</small>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div
              class="card border-0 shadow-sm h-100 border-start border-danger border-3"
            >
              <div class="card-body py-3 px-4">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-exclamation-triangle text-danger me-2"></i>
                  <small class="text-muted text-uppercase"
                    >Low Stock Items</small
                  >
                </div>
                <h5 class="fw-bold mb-0 text-danger">
                  {{ lowStockCount }}
                </h5>
                <small class="text-danger small">
                  {{
                    lowStockCount === 1
                      ? "Needs immediate attention"
                      : "Need immediate attention"
                  }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-3">
        <div class="row g-3 align-items-center">
          <div class="col-12 col-lg-5">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0 ps-0 small"
                placeholder="Search products by name, SKU or brand..."
                v-model="searchQuery"
              />
            </div>
          </div>

          <div class="col-12 col-lg-7">
            <div
              class="d-flex flex-wrap gap-2 justify-content-lg-end align-items-center"
            >
              <select
                class="form-select form-select-sm w-auto small"
                v-model="selectedCategory"
              >
                <option value="">Category: All</option>

                <!-- Loading state -->
                <option v-if="categories.length === 0" disabled>
                  Đang tải danh mục...
                </option>

                <!-- Danh sách động từ API -->
                <option
                  v-for="cat in categories"
                  :key="cat.categoryId"
                  :value="cat.categoryName"
                >
                  {{ cat.categoryName }}
                </option>
              </select>
              <select class="form-select form-select-sm w-auto small">
                <option>Supplier: All</option>
              </select>
              <div class="vr mx-2 d-none d-sm-block"></div>
              <button class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-upload me-1"></i> Import Excel
              </button>
              <button
                class="btn btn-success btn-sm fw-bold"
                @click="openAddModal"
                :disabled="loading"
              >
                <i class="bi bi-plus-lg me-1"></i> Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="card border-0 shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover mb-0 align-middle small">
          <thead class="bg-light">
            <tr>
              <th class="text-uppercase text-muted small ps-4">Image</th>
              <th class="text-uppercase text-muted small">Product Info</th>
              <th class="text-uppercase text-muted small">Category</th>
              <th class="text-uppercase text-muted small text-end">Qty</th>
              <th class="text-uppercase text-muted small text-end">
                Cost / Sell
              </th>
              <th class="text-uppercase text-muted small">Supplier</th>
              <th class="text-uppercase text-muted small text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" class="text-center">
              <td colspan="7" class="py-4">Đang tải sản phẩm...</td>
            </tr>
            <tr v-else-if="products.length === 0" class="text-center">
              <td colspan="7" class="py-4 text-muted">
                Không có sản phẩm nào.
              </td>
            </tr>
            <tr
              v-else
              v-for="product in filteredProducts"
              :key="product.id || product.sku"
              class="hover-bg-light"
            >
              <td class="ps-4 py-3">
                <img
                  :src="'https://localhost:7189/' + product.imageUrl"
                  class="rounded object-fit-cover"
                  width="48"
                  height="48"
                  :alt="product.productName"
                />
              </td>
              <td class="py-3">
                <div class="fw-bold">{{ product.productName }}</div>
                <small class="text-muted">{{ product.sku }}</small>
              </td>
              <td class="py-3">
                <span
                  class="badge"
                  :class="getCategoryClass(product.category?.categoryName)"
                >
                  {{ product.category?.categoryName || "N/A" }}
                </span>
              </td>
              <td class="py-3 text-end">
                <div
                  v-if="product.quantity < 10"
                  class="d-flex flex-column align-items-end"
                >
                  <span class="fw-bold text-danger">{{
                    product.quantity
                  }}</span>
                  <span
                    class="badge bg-danger bg-opacity-10 text-danger small mt-1"
                    >Low Stock</span
                  >
                </div>
                <span v-else class="fw-bold">{{ product.quantity }}</span>
              </td>
              <td class="py-3 text-end">
                <div class="fw-bold">
                  {{ (product.sellingPrice / 1000).toFixed(3) }}k
                </div>
                <!-- hoặc format tùy ý -->
                <small class="text-muted"
                  >Cost: {{ (product.costPrice / 1000).toFixed(3) }}k</small
                >
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center gap-2">
                  <div
                    class="bg-secondary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center text-xs fw-bold"
                    style="width: 24px; height: 24px"
                  >
                    {{ getSupplierInitials(product.supplier) }}
                  </div>
                  <span class="small">{{ product.supplier }}</span>
                </div>
              </td>
              <td class="py-3 text-center">
                <button
                  class="btn btn-link text-success p-1"
                  title="Edit"
                  @click="openEditModal(product)"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-link text-danger p-1"
                  title="Delete"
                  @click="deleteProduct(product.productId)"
                  :disabled="deletingId === product.productId"
                >
                  <span
                    v-if="deletingId === product.productId"
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  <i v-else class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination (tạm giữ nguyên) -->
      <div
        class="card-footer bg-transparent border-top d-flex justify-content-between align-items-center py-3 px-4"
      >
        <small class="text-muted">
          Showing <strong>1</strong> to
          <strong>{{ filteredProducts.length }}</strong> of
          <strong>{{ products.length }}</strong> results
        </small>
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal Add Product -->
    <div
      class="modal fade"
      :class="{ show: showAddModal }"
      :style="{ display: showAddModal ? 'block' : 'none' }"
      tabindex="-1"
      v-if="showAddModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              {{ isEditMode ? "Edit Product" : "Add New Product" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeAddModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addProduct">
              <div class="row g-3">
                <!-- Upload Image -->
                <div class="col-12 col-md-4">
                  <div
                    class="border border-dashed border-secondary rounded-3 p-5 text-center hover-border-primary cursor-pointer position-relative overflow-hidden"
                    @dragover.prevent
                    @drop.prevent="handleImageDrop"
                    @click="$refs.imageInput.click()"
                  >
                    <img
                      v-if="previewImage"
                      :src="previewImage"
                      class="rounded object-fit-cover w-100 h-100 position-absolute top-0 start-0"
                      style="object-fit: cover"
                    />
                    <div v-else>
                      <i class="bi bi-cloud-upload text-muted fs-1 mb-3"></i>
                      <p class="small text-muted mb-1">
                        <strong>Click to upload</strong> or drag and drop
                      </p>
                      <p class="small text-muted">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input
                      ref="imageInput"
                      type="file"
                      accept="image/*"
                      class="d-none"
                      @change="handleImageSelect"
                    />
                  </div>
                </div>

                <!-- Form Fields -->
                <div class="col-12 col-md-8">
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="form-label small fw-medium"
                        >Product Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="newProduct.name"
                        :class="{ 'is-invalid': errors.name }"
                      />
                      <div class="invalid-feedback">
                        {{ errors.name }}
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium">SKU</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="newProduct.sku"
                        placeholder="e.g. BEV-001"
                        :class="{ 'is-invalid': errors.sku }"
                      />
                      <div class="invalid-feedback">
                        {{ errors.sku }}
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium">
                        Category <span class="text-danger">*</span>
                      </label>

                      <!-- Select Category với tùy chọn thêm mới -->
                      <select
                        class="form-select"
                        v-model="selectedCategoryOption"
                        :class="{ 'is-invalid': errors.categoryId }"
                      >
                        <option value="" disabled>Chọn danh mục</option>

                        <!-- Loading -->
                        <option v-if="categories.length === 0" disabled>
                          Đang tải danh mục...
                        </option>

                        <!-- Danh sách danh mục hiện có -->
                        <option
                          v-for="cat in categories"
                          :key="cat.categoryId"
                          :value="cat.categoryId"
                        >
                          {{ cat.categoryName }}
                        </option>

                        <!-- Tùy chọn thêm mới -->
                        <option value="new">+ Thêm danh mục mới</option>
                      </select>

                      <!-- Input nhập tên category mới (hiện khi chọn "Thêm mới") -->
                      <div v-if="selectedCategoryOption === 'new'" class="mt-2">
                        <div class="input-group input-group-sm">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Nhập tên danh mục mới..."
                            v-model="newCategoryName"
                            @keyup.enter="createNewCategory"
                          />
                          <button
                            class="btn btn-outline-success"
                            type="button"
                            @click="createNewCategory"
                            :disabled="
                              !newCategoryName.trim() || creatingCategory
                            "
                          >
                            <span
                              v-if="creatingCategory"
                              class="spinner-border spinner-border-sm"
                              role="status"
                            ></span>
                            <span v-else>Thêm</span>
                          </button>
                        </div>
                        <small class="text-muted"
                          >Nhấn Enter hoặc nút Thêm để tạo</small
                        >
                      </div>

                      <!-- Lỗi -->
                      <div class="invalid-feedback">
                        {{ errors.categoryId }}
                      </div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium"
                        >Cost Price</label
                      >
                      <div class="input-group">
                        <span class="input-group-text">VNĐ</span>
                        <input
                          type="number"
                          class="form-control"
                          v-model="newProduct.costPrice"
                          :class="{ 'is-invalid': errors.costPrice }"
                        />
                        <div class="invalid-feedback">
                          {{ errors.costPrice }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium"
                        >Selling Price</label
                      >
                      <div class="input-group">
                        <span class="input-group-text">VNĐ</span>
                        <input
                          type="number"
                          step="0.01"
                          class="form-control"
                          v-model.number="newProduct.sellingPrice"
                          :class="{ 'is-invalid': errors.sellingPrice }"
                        />
                        <div class="invalid-feedback">
                          {{ errors.sellingPrice }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium"
                        >Initial Quantity</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        v-model.number="newProduct.quantity"
                        min="0"
                        placeholder="0"
                        :class="{ 'is-invalid': errors.quantity }"
                      />
                      <div class="invalid-feedback">
                        {{ errors.quantity }}
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium">Supplier</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="newProduct.supplier"
                        placeholder="e.g. Tea Suppliers Inc."
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeAddModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-success fw-bold"
              @click="isEditMode ? updateProduct() : addProduct()"
              :disabled="adding"
            >
              <span
                v-if="adding"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {{ isEditMode ? "Update Product" : "Add Product" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div class="modal-backdrop fade show" v-if="showAddModal"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";

// State
const categories = ref([]);
const products = ref([]);
const loading = ref(false);
const adding = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("");
const showAddModal = ref(false);
const deletingId = ref(null);
const isEditMode = ref(false);
const editingProductId = ref(null);
const selectedCategoryOption = ref(""); // Giá trị select: number (categoryId) hoặc 'new'
const newCategoryName = ref(""); // Tên category mới khi nhập
const creatingCategory = ref(false); // Loading khi tạo category mới

const newProduct = ref({
  name: "",
  sku: "",
  categoryId: "",
  costPrice: 0,
  sellingPrice: 0,
  quantity: 0,
  supplier: "",
});

const selectedImage = ref(null);
const previewImage = ref(null);

const errors = ref({});

const resetForm = () => {
  newProduct.value.name = "";
  newProduct.value.sku = "";
  newProduct.value.categoryId = "";
  newProduct.value.costPrice = 0;
  newProduct.value.sellingPrice = 0;
  newProduct.value.quantity = 0;
  newProduct.value.supplier = "";

  selectedImage.value = null;
  previewImage.value = null;
  errors.value = {};
  selectedCategoryOption.value = "";
  newCategoryName.value = "";
};

watch(selectedCategoryOption, (val) => {
  if (val !== "new") {
    newProduct.value.categoryId = val ? Number(val) : "";
  }
  // Nếu chọn 'new' → để trống, chờ tạo xong mới gán
});
// Lấy danh sách sản phẩm
const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await axios.get("https://localhost:7189/api/Products");
    products.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    alert("Không thể tải danh sách sản phẩm. Vui lòng kiểm tra API.");
    // Có thể fallback data cứng nếu cần
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get("https://localhost:7189/api/Categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    alert("Không thể tải danh sách danh mục.");
  }
};
const lowStockCount = computed(() => {
  return products.value.filter((product) => product.quantity < 5).length;
});
onMounted(() => {
  fetchProducts();
  fetchCategories();
});

const validateForm = () => {
  errors.value = {};

  if (!newProduct.value.name)
    errors.value.name = "Tên sản phẩm không được để trống";

  if (!newProduct.value.sku) errors.value.sku = "SKU không được để trống";

  if (!newProduct.value.categoryId)
    errors.value.categoryId = "Vui lòng chọn danh mục";

  if (!newProduct.value.costPrice || newProduct.value.costPrice <= 0)
    errors.value.costPrice = "Giá nhập phải lớn hơn 0";

  if (!newProduct.value.sellingPrice || newProduct.value.sellingPrice <= 0)
    errors.value.sellingPrice = "Giá bán phải lớn hơn 0";

  if (!newProduct.value.quantity || newProduct.value.quantity < 0)
    errors.value.quantity = "Số lượng không hợp lệ";

  if (!newProduct.value.supplier)
    errors.value.supplier = "Nhà cung cấp không được để trống";

  if (!selectedImage.value) errors.value.image = "Vui lòng chọn hình ảnh";

  return Object.keys(errors.value).length === 0;
};

// Filter sản phẩm
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const categoryName = product.category?.categoryName || "";
    const matchesSearch =
      product.productName
        ?.toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      !selectedCategory.value || categoryName === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// Helper
const getCategoryClass = (categoryName) => {
  const map = {
    Beverages: "bg-primary bg-opacity-10 text-primary",
    Snacks: "bg-warning bg-opacity-10 text-warning",
    Household: "bg-purple bg-opacity-10 text-purple",
    Dairy: "bg-info bg-opacity-10 text-info",
    Bakery: "bg-orange bg-opacity-10 text-orange",
  };
  return map[categoryName] || "bg-secondary bg-opacity-10 text-secondary";
};

const getSupplierInitials = (supplier) => {
  if (!supplier) return "??";
  return supplier
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Xử lý ảnh
// = onImageChange
const handleImageSelect = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedImage.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

// = onImageChange (drag drop)
const handleImageDrop = (e) => {
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedImage.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const uploadImage = async () => {
  const formData = new FormData();
  formData.append("file", selectedImage.value);

  const res = await axios.post(
    "https://localhost:7189/api/Products/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data.imageUrl; // /img/xxx.jpg
};

// Thêm sản phẩm
const addProduct = async () => {
  if (!validateForm()) return;

  adding.value = true;
  try {
    let imageUrl = null;

    // 1. Upload ảnh CHỈ KHI bấm Add
    if (selectedImage.value) {
      imageUrl = await uploadImage();
    }

    // 2. Gửi JSON product
    const product = {
      productName: newProduct.value.name,
      sku: newProduct.value.sku,
      categoryId: newProduct.value.categoryId,
      costPrice: newProduct.value.costPrice,
      sellingPrice: newProduct.value.sellingPrice,
      quantity: newProduct.value.quantity,
      supplier: newProduct.value.supplier,
      imageUrl: imageUrl,
    };

    const response = await axios.post(
      "https://localhost:7189/api/Products",
      product,
      { headers: { "Content-Type": "application/json" } }
    );

    products.value = [...products.value, response.data];
    closeAddModal();
    alert("Thêm sản phẩm thành công!");
  } catch (error) {
    console.error(error);
    alert("Thêm sản phẩm thất bại");
  } finally {
    adding.value = false;
  }
};

const closeAddModal = () => {
  showAddModal.value = false;
  isEditMode.value = false;
  editingProductId.value = null;
};
const deleteProduct = async (productId) => {
  // Xác nhận trước khi xóa
  if (!confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
    return;
  }
  deletingId.value = productId;
  try {
    await axios.delete(`https://localhost:7189/api/Products/${productId}`);

    // Xóa khỏi danh sách local
    products.value = products.value.filter((p) => p.productId !== productId);

    alert("Xóa sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    alert("Xóa sản phẩm thất bại. Vui lòng thử lại.");
  } finally {
    deletingId.value = null;
  }
};

const updateProduct = async () => {
  if (!validateForm()) return;

  adding.value = true;
  try {
    let imageUrl = null;

    // Nếu người dùng chọn ảnh mới → upload
    if (selectedImage.value) {
      imageUrl = await uploadImage();
    } else {
      // Giữ nguyên ảnh cũ: lấy từ preview (đã có đường dẫn đầy đủ)
      imageUrl = previewImage.value.replace("https://localhost:7189/", "");
    }

    const product = {
      productId: editingProductId.value,
      productName: newProduct.value.name,
      sku: newProduct.value.sku,
      categoryId: newProduct.value.categoryId,
      costPrice: newProduct.value.costPrice,
      sellingPrice: newProduct.value.sellingPrice,
      quantity: newProduct.value.quantity,
      supplier: newProduct.value.supplier,
      imageUrl: imageUrl,
    };

    const response = await axios.put(
      `https://localhost:7189/api/Products/${editingProductId.value}`,
      product,
      { headers: { "Content-Type": "application/json" } }
    );

    // Cập nhật lại trong danh sách
    const index = products.value.findIndex(
      (p) => p.productId === editingProductId.value
    );
    if (index !== -1) {
      products.value[index] = response.data;
    }

    closeAddModal();
    alert("Cập nhật sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    alert(
      "Cập nhật thất bại: " + (error.response?.data?.message || error.message)
    );
  } finally {
    adding.value = false;
  }
};

const openAddModal = () => {
  isEditMode.value = false;
  editingProductId.value = null;
  resetForm();
  showAddModal.value = true;
};

const openEditModal = (product) => {
  console.log("Product đang edit:", product); // ← Để dòng này đầu tiên để debug

  isEditMode.value = true;
  editingProductId.value = product.productId;

  // 1. Đổ dữ liệu vào form TRƯỚC
  newProduct.value.name = product.productName || "";
  newProduct.value.sku = product.sku || "";
  newProduct.value.categoryId = product.category?.categoryId ?? "";
  newProduct.value.costPrice = product.costPrice || 0;
  newProduct.value.sellingPrice = product.sellingPrice || 0;
  newProduct.value.quantity = product.quantity || 0;
  newProduct.value.supplier = product.supplier || "";

  // 2. Hiển thị ảnh cũ
  previewImage.value = product.imageUrl
    ? `https://localhost:7189/${product.imageUrl}`
    : null;

  selectedImage.value = null;

  // 3. Reset errors CUỐI CÙNG (sau khi đã gán dữ liệu)
  errors.value = {};
  selectedCategoryOption.value = product.category?.categoryId ?? "";
  newCategoryName.value = "";
  showAddModal.value = true;
};

const createNewCategory = async () => {
  const name = newCategoryName.value.trim();
  if (!name) return;

  creatingCategory.value = true;
  try {
    const response = await axios.post("https://localhost:7189/api/Categories", {
      categoryName: name,
    });

    const newCat = response.data; // { categoryId: xx, categoryName: "xxx" }

    // Thêm vào danh sách categories
    categories.value.push(newCat);

    // Tự động chọn category vừa tạo
    selectedCategoryOption.value = newCat.categoryId;
    newProduct.value.categoryId = newCat.categoryId;

    // Reset input
    newCategoryName.value = "";
    alert(`Đã tạo danh mục mới: ${newCat.categoryName}`);
  } catch (error) {
    console.error("Lỗi tạo danh mục:", error);
    alert(
      "Tạo danh mục thất bại: " + (error.response?.data?.title || error.message)
    );
  } finally {
    creatingCategory.value = false;
  }
};
</script>

<style scoped>
.hover-bg-light:hover {
  background-color: rgba(0, 255, 0, 0.03);
}
.hover-border-primary:hover {
  border-color: #198754 !important;
}
.cursor-pointer {
  cursor: pointer;
}
.bg-purple {
  background-color: #6f42c1;
}
.text-purple {
  color: #6f42c1;
}
.bg-orange {
  background-color: #fd7e14;
}
.text-orange {
  color: #fd7e14;
}
</style>
