<!-- src/views/POSCashier.vue -->
<template>
  <div class="d-flex h-100">
    <!-- Phần grid sản phẩm -->
    <div class="flex-grow-1 overflow-auto p-3">
      <!-- Search & Filter -->
      <div class="mb-3">
        <div class="d-flex gap-2 mb-2">
          <div class="position-relative flex-grow-1">
            <i
              class="bi bi-upc-scan position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            ></i>
            <input
              type="text"
              class="form-control ps-5 py-2 rounded-3 shadow-sm small"
              placeholder="Scan hoặc tìm sản phẩm (⌘K)..."
            />
            <small
              class="position-absolute top-50 end-0 translate-middle-y me-3 badge bg-light text-muted border small"
              >⌘K</small
            >
          </div>
          <button class="btn btn-outline-secondary px-3">
            <i class="bi bi-funnel"></i>
          </button>
        </div>

        <div class="d-flex gap-2 overflow-x-auto pb-1">
          <!-- Nút All Items -->
          <button
            class="btn px-3 py-1 small fw-bold"
            :class="{
              'btn-dark': selectedCategory === 'All Items',
              'btn-outline-secondary': selectedCategory !== 'All Items',
            }"
            @click="selectCategory('All Items')"
          >
            All Items
          </button>

          <!-- Các category -->
          <button
            v-for="cat in categories"
            :key="cat"
            class="btn px-3 py-1 small"
            :class="{
              'btn-dark fw-bold': selectedCategory === cat,
              'btn-outline-secondary': selectedCategory !== cat,
            }"
            @click="selectCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="row g-2">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-6 col-md-4 col-lg-3 col-xl-2"
        >
          <div
            class="card h-100 border-0 shadow-sm hover-shadow transition-all cursor-pointer"
            @click="addToCart(product)"
          >
            <div class="position-relative">
              <img
                :src="product.image"
                class="card-img-top rounded-top"
                style="height: 120px; object-fit: cover"
                :alt="product.name"
              />
              <span
                class="position-absolute top-0 end-0 m-1 badge bg-dark bg-opacity-75 small"
                >{{ product.stock }}</span
              >
              <span
                v-if="product.discount"
                class="position-absolute top-0 start-0 m-1 badge bg-warning text-dark small"
              >
                -{{ product.discount }}%
              </span>
            </div>
            <div class="card-body p-2 d-flex flex-column">
              <h6 class="card-title fw-bold mb-1 small line-clamp-2">
                {{ product.name }}
              </h6>
              <small class="text-muted mb-1">{{ product.category }}</small>
              <div
                class="mt-auto d-flex justify-content-between align-items-center"
              >
                <div class="fw-bold text-success">{{ product.price }}</div>
                <button
                  class="btn btn-outline-dark rounded-circle p-1"
                  style="width: 28px; height: 28px"
                >
                  <i class="bi bi-plus-lg small"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Giỏ hàng bên phải -->
    <aside
      class="bg-white border-start shadow d-flex flex-column"
      style="width: 360px"
    >
      <!-- Customer Info -->
      <div class="p-3 border-bottom">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <small class="text-uppercase fw-bold text-muted">Khách hàng</small>
          <button class="btn btn-link text-success small p-0">
            <i class="bi bi-person-plus"></i> Thêm
          </button>
        </div>
        <div class="d-flex align-items-center gap-2 bg-light rounded-3 p-2">
          <div
            class="bg-warning bg-opacity-20 text-warning rounded-circle d-flex align-items-center justify-content-center fw-bold small"
            style="width: 36px; height: 36px"
          >
            JD
          </div>
          <div class="flex-grow-1">
            <div class="fw-bold small">Jane Doe</div>
            <small class="text-muted">Thành viên từ 2021</small>
          </div>
          <div
            class="badge bg-warning bg-opacity-10 text-warning small px-2 py-1"
          >
            <i class="bi bi-stars me-1"></i> 450 Pts
          </div>
        </div>
      </div>

      <!-- Cart Items -->
      <div class="flex-grow-1 overflow-auto p-3">
        <div class="small text-muted d-flex mb-1 px-1">
          <div class="flex-grow-1">Sản phẩm</div>
          <div class="text-center" style="width: 70px">SL</div>
          <div class="text-end" style="width: 60px">Giá</div>
        </div>

        <div
          v-for="item in cartItems"
          :key="item.id"
          class="d-flex align-items-center gap-2 p-2 rounded hover-bg-light transition-all small"
        >
          <img
            :src="item.thumb"
            class="rounded"
            width="40"
            height="40"
            alt=""
          />
          <div class="flex-grow-1 text-truncate-container">
            <div class="fw-bold small text-truncate-line" :title="item.name">
              {{ item.name }}
            </div>
            <small class="text-muted">{{ item.unitPrice }} / cái</small>
          </div>
          <div class="input-group input-group-sm" style="width: 80px">
            <button
              class="btn btn-outline-secondary btn-sm"
              @click.stop="updateQty(item, item.qty - 1)"
            >
              −
            </button>
            <input
              type="text"
              class="form-control text-center fw-bold small"
              :value="item.qty"
              min="1"
              style="width: 27px"
              @input="updateQtyFromInput(item, $event.target.value)"
              @keyup.enter="$event.target.blur()"
              @blur="updateQtyFromInput(item, $event.target.value)"
            />
            <button
              class="btn btn-outline-secondary btn-sm"
              @click.stop="updateQty(item, item.qty + 1)"
            >
              +
            </button>
          </div>
          <div class="fw-bold text-end small" style="width: 60px">
            {{ item.total }}
          </div>
          <button
            class="btn btn-link text-danger p-0 small"
            @click.stop="removeItem(item)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <!-- Checkout -->
      <div class="border-top bg-white p-3">
        <div class="mb-2">
          <div class="d-flex justify-content-between small text-muted">
            <span>Tạm tính</span>
            <span class="fw-bold">{{ formatVND(subtotal) }}</span>
          </div>
          <div class="d-flex justify-content-between small text-muted">
            <span>Thuế ({{ formatPercent(taxRate) }})</span>
            <span class="fw-bold">{{ formatVND(tax) }}</span>
          </div>
          <div
            class="d-flex justify-content-between align-items-center small mt-2"
          >
            <div class="d-flex align-items-center gap-2">
              <button
                class="btn btn-link p-0 small text-warning"
                @click="showDiscountModal = true"
              >
                <i class="bi bi-tag"></i> Giảm giá
              </button>
              <span class="text-danger fw-bold" v-if="discountAmount > 0"
                >-{{ formatVND(discountAmount) }}</span
              >
              <span class="text-muted" v-else>-0 ₫</span>
            </div>
          </div>
          <hr class="my-2" />
          <div class="d-flex justify-content-between align-items-end">
            <span class="fw-bold small">Tổng cộng</span>
            <h4 class="fw-black mb-0 text-success">
              {{ formatVND(finalTotal) }}
            </h4>
          </div>
        </div>

        <div class="mb-3">
          <small class="text-uppercase fw-bold text-muted d-block mb-2"
            >Thanh toán</small
          >
          <div class="row g-2">
            <div class="col-6">
              <input
                type="radio"
                class="btn-check"
                name="payment"
                id="pay-cash"
                value="cash"
                v-model="selectedPaymentMethod"
              />
              <label
                class="btn btn-outline-success w-100 py-1 position-relative"
                for="pay-cash"
              >
                <i class="bi bi-cash fs-6 me-1"></i>
                <small>Tiền mặt</small>
              </label>
            </div>

            <div class="col-6">
              <input
                type="radio"
                class="btn-check"
                name="payment"
                id="pay-qr"
                value="qr"
                v-model="selectedPaymentMethod"
              />
              <label
                class="btn btn-outline-success w-100 py-1 position-relative"
                for="pay-qr"
              >
                <i class="bi bi-qr-code-scan fs-6 me-1"></i>
                <small>QR Code</small>
              </label>
            </div>
          </div>
        </div>

        <button
          class="btn btn-success w-100 py-3 fw-bold shadow-lg"
          :disabled="cartItems.length === 0 || isProcessing"
          @click="openPaymentModal"
        >
          <span
            v-if="isProcessing"
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>
          {{ isProcessing ? "Đang xử lý..." : "Tiến hành thanh toán" }}
          <i class="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </aside>

    <!-- MODAL TIỀN MẶT -->
    <div
      class="modal fade"
      :class="{ show: showCashModal }"
      :style="{ display: showCashModal ? 'block' : 'none' }"
      tabindex="-1"
      @click.self="showCashModal = false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">Thanh toán tiền mặt</h5>
            <button
              type="button"
              class="btn-close"
              @click="showCashModal = false"
            ></button>
          </div>
          <div class="modal-body pt-0">
            <div class="text-center mb-4">
              <h3 class="text-success fw-black">
                Tổng tiền: {{ formatVND(finalTotal) }}
              </h3>
            </div>
            <div class="mb-3">
              <label class="form-label small fw-bold">Số tiền khách đưa</label>
              <input
                type="number"
                class="form-control form-control-lg text-center"
                v-model.number="cashReceived"
                placeholder="0"
                min="0"
                @input="calculateChange"
                ref="cashInput"
              />
            </div>
            <div class="alert alert-info text-center py-3" v-if="change >= 0">
              <h4 class="mb-0 fw-bold text-primary">
                Tiền thối: {{ formatVND(change) }}
              </h4>
            </div>
            <div class="alert alert-warning text-center py-3" v-else>
              <small>Chưa đủ tiền!</small>
            </div>
          </div>
          <div class="modal-footer border-0">
            <div class="row w-100 g-2">
              <div class="col-4">
                <button
                  class="btn btn-outline-secondary w-100 h-100"
                  @click="printReceipt"
                  :disabled="change < 0"
                >
                  <i class="bi bi-printer me-2"></i>
                  In hóa đơn
                </button>
              </div>
              <div class="col-8">
                <button
                  class="btn btn-success w-100 py-3 fw-bold"
                  @click="completeOrder"
                  :disabled="change < 0 || isProcessing"
                >
                  <span
                    v-if="isProcessing"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  Hoàn tất thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL QR -->
    <div
      class="modal fade"
      :class="{ show: showQRModal }"
      :style="{ display: showQRModal ? 'block' : 'none' }"
      tabindex="-1"
      @click.self="closeQRModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">Quét mã QR để thanh toán</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeQRModal"
            ></button>
          </div>
          <div class="modal-body text-center py-3">
            <h4 class="text-success mb-4">
              Tổng tiền: {{ formatVND(finalTotal) }}
            </h4>
            <img
              :src="qrCodeUrl"
              alt="QR Code"
              class="img-fluid rounded shadow"
            />
            <div class="mt-4">
              <small class="text-muted"
                >Hướng dẫn khách quét mã bằng ứng dụng ngân hàng</small
              >
            </div>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex w-100 gap-2">
              <button
                class="btn btn-outline-secondary"
                style="flex: 3"
                @click="printReceipt"
              >
                <i class="bi bi-printer me-2"></i>
                In hóa đơn
              </button>
              <button
                class="btn btn-success py-3 fw-bold"
                style="flex: 7"
                @click="completeOrder"
                :disabled="isProcessing"
              >
                <span
                  v-if="isProcessing"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Xác nhận đã nhận tiền
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay chung -->
    <div
      class="modal-backdrop fade"
      :class="{ show: showCashModal || showQRModal }"
      v-if="showCashModal || showQRModal"
    ></div>

    <!-- Modal Giảm giá -->
    <div
      class="modal fade"
      :class="{ show: showDiscountModal }"
      :style="{ display: showDiscountModal ? 'block' : 'none' }"
      tabindex="-1"
      @click.self="showDiscountModal = false"
    >
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <h6 class="modal-title fw-bold">Áp dụng giảm giá</h6>
            <button
              type="button"
              class="btn-close"
              @click="showDiscountModal = false"
            ></button>
          </div>

          <!-- 👇 FORM BẮT ĐẦU Ở ĐÂY -->
          <form @submit.prevent="applyDiscount">
            <div class="modal-body pt-2">
              <div class="btn-group w-100 mb-3" role="group">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  :class="{ 'active btn-primary': discountType === 'amount' }"
                  @click="discountType = 'amount'"
                >
                  Theo tiền
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  :class="{ 'active btn-primary': discountType === 'percent' }"
                  @click="discountType = 'percent'"
                >
                  Theo %
                </button>
              </div>

              <div class="input-group">
                <input
                  type="number"
                  class="form-control text-center"
                  v-model.number="discountValue"
                  :placeholder="
                    discountType === 'percent' ? 'Nhập %' : 'Nhập số tiền'
                  "
                  min="0"
                  autofocus
                />
                <span class="input-group-text">
                  {{ discountType === "percent" ? "%" : "₫" }}
                </span>
              </div>

              <small class="text-muted d-block text-center mt-2">
                Tạm tính: {{ formatVND(subtotal) }} → Giảm:
                {{ formatVND(discountAmount) }}
              </small>
            </div>

            <div class="modal-footer border-0 pt-0">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                @click="clearDiscount"
              >
                Xóa giảm giá
              </button>

              <!-- 👇 submit -->
              <button type="submit" class="btn btn-success btn-sm">
                Áp dụng
              </button>
            </div>
          </form>
          <!-- 👆 FORM KẾT THÚC -->
        </div>
      </div>
    </div>

    <div
      class="modal-backdrop fade"
      :class="{ show: showDiscountModal }"
      v-if="showDiscountModal"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import axios from "axios";
import { DateTime } from "luxon";

const allProducts = ref([]);
const categories = ref([]);
const selectedCategory = ref("All Items");
const cartItems = ref([]);
const selectedPaymentMethod = ref("cash");
const isProcessing = ref(false);

// Modal controls
const showCashModal = ref(false);
const showQRModal = ref(false);
const showDiscountModal = ref(false);

// Cash payment
const cashReceived = ref(0);
const change = ref(0);
const cashInput = ref(null); // ← Thêm ref này để focus

// QR payment
const referenceCode = ref("");
const pollingInterval = ref(null);
const qrTimeout = ref(null);

// Discount
const discountType = ref("none");
const discountValue = ref(0);
const applyDiscount = () => {
  showDiscountModal.value = false;
};

const qrCodeUrl = computed(() => {
  if (!referenceCode.value) return "";
  return `https://qr.sepay.vn/img?acc=VQRQAGIKX7826&bank=MBBank&amount=${Math.round(
    finalTotal.value
  )}&des=${encodeURIComponent(referenceCode.value)}`;
});

const products = computed(() => {
  if (selectedCategory.value === "All Items") return allProducts.value;
  return allProducts.value.filter((p) => p.category === selectedCategory.value);
});

const loadProducts = async () => {
  try {
    const response = await axios.get(`https://localhost:7189/api/Products`);
    const data = response.data;

    allProducts.value = data.map((product) => ({
      id: product.productId,
      name: product.productName,
      category: product.category?.categoryName || "Uncategorized",
      price: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(product.sellingPrice),
      priceRaw: product.sellingPrice,
      stock: product.quantity,
      image: product.imageUrl?.startsWith("http")
        ? product.imageUrl
        : product.imageUrl
        ? `https://localhost:7189${product.imageUrl}`
        : "https://via.placeholder.com/150?text=No+Image",
      discount: null,
    }));

    const uniqueCats = [
      ...new Set(data.map((p) => p.category?.categoryName).filter(Boolean)),
    ];
    categories.value = uniqueCats.sort();
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    alert("Không thể kết nối đến máy chủ.");
    allProducts.value = [];
    categories.value = [];
  }
};

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const addToCart = (product) => {
  const existingItem = cartItems.value.find((item) => item.id === product.id);

  const newQuantity = existingItem ? existingItem.qty + 1 : 1;

  if (newQuantity > product.stock) {
    alert(
      `Không thể thêm! Chỉ còn ${product.stock} sản phẩm "${product.name}" trong kho.`
    );
    return;
  }
  if (existingItem) {
    existingItem.qty += 1;
    existingItem.total = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(existingItem.priceRaw * existingItem.qty);
  } else {
    cartItems.value.push({
      id: product.id,
      name: product.name,
      thumb: product.image,
      unitPrice: product.price,
      priceRaw: product.priceRaw,
      qty: 1,
      total: product.price,
    });
  }
};

const updateQty = (item, newQty) => {
  const product = allProducts.value.find((p) => p.id === item.id);

  if (!product) return;
  if (newQty > product.stock) {
    alert(
      `Không thể tăng! Chỉ còn ${product.stock} sản phẩm "${item.name}" trong kho.`
    );
    return;
  }
  if (newQty <= 0) {
    removeItem(item);
    return;
  }

  item.qty = newQty;
  item.total = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.priceRaw * newQty);
};

const updateQtyFromInput = (item, value) => {
  let newQty = parseInt(value) || 1;
  if (newQty < 1) newQty = 1;
  item.qty = newQty;
  item.total = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.priceRaw * newQty);
};

const removeItem = (item) => {
  const index = cartItems.value.indexOf(item);
  if (index > -1) cartItems.value.splice(index, 1);
};

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.priceRaw * item.qty, 0)
);

const taxRate = 0.08;
const tax = computed(() => subtotal.value * taxRate);

const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );
const formatPercent = (rate) => `${Math.round(rate * 100)}%`;

const discountAmount = computed(() => {
  if (discountType.value === "amount") return Math.max(0, discountValue.value);
  if (discountType.value === "percent") {
    const percent = Math.max(0, Math.min(100, discountValue.value));
    return (subtotal.value * percent) / 100;
  }
  return 0;
});

const finalTotal = computed(
  () => subtotal.value + tax.value - discountAmount.value
);

const clearDiscount = () => {
  discountType.value = "none";
  discountValue.value = 0;
  showDiscountModal.value = false;
};

const openPaymentModal = () => {
  if (cartItems.value.length === 0) return;

  if (selectedPaymentMethod.value === "cash") {
    showCashModal.value = true;
    showQRModal.value = false;
    nextTick(() => {
      cashInput.value?.focus();
    });
  } else if (selectedPaymentMethod.value === "qr") {
    showQRModal.value = true;
    showCashModal.value = false;

    // Sinh mã đơn hàng duy nhất
    const now = DateTime.local();
    referenceCode.value = "DH" + now.toFormat("yyyyMMddHHmmss");
    //console.log(referenceCode.value);
    startPolling();

    // Hết hạn sau 5 phút
    qrTimeout.value = setTimeout(() => {
      if (showQRModal.value) {
        alert("Thanh toán QR đã hết hạn. Vui lòng thử lại.");
        closeQRModal();
      }
    }, 5 * 60 * 1000);
  }
};

const calculateChange = () => {
  change.value = cashReceived.value - finalTotal.value;
};

const printReceipt = () => {
  alert("Đang gửi lệnh in hóa đơn tới máy in nhiệt...");
};

const completeOrder = async () => {
  isProcessing.value = true;
  try {
    const orderData = {
      customerName: "Jane Doe",
      customerPhone: null,
      paymentMethod: selectedPaymentMethod.value === "cash" ? "Cash" : "QR",
      subtotal: subtotal.value,
      tax: tax.value,
      discountAmount: discountAmount.value,
      discountType:
        discountType.value === "percent"
          ? "Percent"
          : discountType.value === "amount"
          ? "Amount"
          : "None",
      discountValue: discountValue.value,
      totalAmount: finalTotal.value,
      orderDate: new Date().toISOString(),
      orderDetails: cartItems.value.map((item) => ({
        productId: item.id,
        quantity: item.qty,
        unitPrice: item.priceRaw,
        totalPrice: item.priceRaw * item.qty,
      })),
    };

    await axios.post("https://localhost:7189/api/Orders", orderData);

    alert("Thanh toán thành công! Đơn hàng đã được lưu.");
    cartItems.value = [];
    clearDiscount();
    showCashModal.value = false;
    showQRModal.value = false;
    await loadProducts();
  } catch (error) {
    console.error("Lỗi khi hoàn tất đơn hàng:", error);
    alert("Thanh toán thất bại. Vui lòng thử lại.");
  } finally {
    isProcessing.value = false;
  }
};

const startPolling = () => {
  pollingInterval.value = setInterval(async () => {
    if (!referenceCode.value) return;
    try {
      const response = await axios.get(
        `https://localhost:7189/api/sepay/qr/check/${referenceCode.value}`
      );
      if (response.data === true) {
        clearInterval(pollingInterval.value);
        clearTimeout(qrTimeout.value);
        await completeOrder();
        closeQRModal();
      }
    } catch (error) {
      console.error("Lỗi polling QR:", error);
    }
  }, 5000);
};

const closeQRModal = () => {
  showQRModal.value = false;
  referenceCode.value = "";
  if (pollingInterval.value) clearInterval(pollingInterval.value);
  if (qrTimeout.value) clearTimeout(qrTimeout.value);
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
.hover-bg-light:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.transition-all {
  transition: all 0.2s ease;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.text-truncate-container {
  min-width: 0;
  flex: 1;
}
.text-truncate-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.text-truncate-line:hover {
  cursor: pointer;
}
</style>
