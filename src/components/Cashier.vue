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
          <button class="btn btn-dark px-3 py-1 small fw-bold">
            All Items
          </button>
          <button class="btn btn-outline-secondary px-3 py-1 small">
            Fresh Food
          </button>
          <button class="btn btn-outline-secondary px-3 py-1 small">
            Beverages
          </button>
          <button class="btn btn-outline-secondary px-3 py-1 small">
            Snacks
          </button>
          <button class="btn btn-outline-secondary px-3 py-1 small">
            Household
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
                >{{ product.stock }} left</span
              >
              <span
                v-if="product.discount"
                class="position-absolute top-0 start-0 m-1 badge bg-warning text-dark small"
                >-{{ product.discount }}%</span
              >
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
          <div class="flex-grow-1">
            <div class="fw-bold small">{{ item.name }}</div>
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
              readonly
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
            <span class="fw-bold">$14.90</span>
          </div>
          <div class="d-flex justify-content-between small text-muted">
            <span>Thuế (8%)</span>
            <span class="fw-bold">$1.19</span>
          </div>
          <div
            class="d-flex justify-content-between align-items-center small text-warning mt-1"
          >
            <button class="btn btn-link p-0 small">
              <i class="bi bi-tag"></i> Giảm giá
            </button>
            <span>-$0.00</span>
          </div>
          <hr class="my-2" />
          <div class="d-flex justify-content-between align-items-end">
            <span class="fw-bold small">Tổng cộng</span>
            <h4 class="fw-black mb-0">$16.09</h4>
          </div>
        </div>

        <div class="mb-2">
          <small class="text-uppercase fw-bold text-muted d-block mb-1"
            >Thanh toán</small
          >
          <div class="row g-1">
            <div class="col-6">
              <button
                class="btn btn-success w-100 py-2 small position-relative"
              >
                <div
                  class="position-absolute top-0 end-0 m-1 bg-white rounded-circle"
                  style="width: 6px; height: 6px"
                ></div>
                <i class="bi bi-cash"></i><br /><small>Tiến mặt</small>
              </button>
            </div>
            <!-- <div class="col-4">
              <button class="btn btn-outline-secondary w-100 py-2 small">
                <i class="bi bi-credit-card"></i><br /><small>Thẻ</small>
              </button>
            </div> -->
            <div class="col-6">
              <button class="btn btn-outline-secondary w-100 py-2 small">
                <i class="bi bi-qr-code"></i><br /><small>QR</small>
              </button>
            </div>
          </div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary flex-grow-1 py-2 small">
            <i class="bi bi-printer"></i> In hóa đơn
          </button>
          <button class="btn btn-success flex-grow-2 py-2 small fw-bold shadow">
            Hoàn tất <i class="bi bi-check-circle ms-1"></i>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
const cashierAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpxMrRKW-izah0TzO2jLqmVXaJkl-DUpbzTIl8_F52YdfsTUeEdBm9IBGi2dfPbacTznh0lxyDfEP1j-P8CQHm4vB5CARJnbdiZm1cyDvhI7cA-bjUK_AOGVu-aPgTokCl8kqs_Xlydz3YlwxcYLaWXQdz2rQWbzdutiUXMKdvTKHOMrb-2agPeHx-MRweAltJdf67o4oM41c7halpG7mw3vrJyPPA4oKWkJWdGUradsYKAiJaPPbwnZKaSkhrTZ8nkte9pI5z7LRh";

// Danh sách sản phẩm mẫu
const products = [
  {
    id: 1,
    name: "Fresh Whole Milk 1L",
    category: "Dairy Products",
    price: "$2.50",
    stock: 54,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYPNBPxoC_gSS_lsIaKdLRvohTJPW0bm2UmeH9-mDgPAvNe2LCe40sCsMFQLRNH2VtzPCwMa9MA6zeoyE1-lI_QLDDbKYnbP9aCyfWkkb6eRCjM2ipLPkdxJqTthBGiu8RdW7a8S3rgwEL1heaBpEaDm_sZfQGa2ZdMolI1o1WLFxxMyvezh0iN63iqPGKjGlXjjXN84wSIoxhHgavOW2afHPs_YMoigPA5Wt3v0-_2TasycO9fXaij046eOneZiPDrnVmZHQ35CNm",
  },
  {
    id: 2,
    name: "Classic Potato Chips",
    category: "Snacks",
    price: "$1.80",
    stock: 120,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwd1JgSkM2bvOXZA9-vKUl72LGTUG5bozEJHoIH5RYvnXUqGbF31S1IhUxpRmpBryc3XHMARYG_J-49qRnwktYJiHU7m6nyzAjL9gvlKWW6qt6qySSkOGtfRJuTQ5aHpwnc872xbDrKIh2uvJMQll_EG4N4dERZ5YYRxnDF_ZtDQzyScS2MH01V413C76iiNWG4TnDbOCiZ-b6rG3O2aMJDfMQP2DWwnjwAzlxcowbr22BNYGF0XD55LLy689n3eqWc0whMX7SWiLB",
  },
  {
    id: 3,
    name: "Fresh Orange Juice",
    category: "Beverages",
    price: "$2.70",
    originalPrice: "$3.00",
    discount: 10,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcZUHB_HiJ-VsgSZYMWUelt4sYTNl6HBwrnGbCR74nlzKAdVaiRMfpkTeqMPEoRLUCChH8PDeTm3ExQ95WeovGbplqTxL-TLlcDVVTp58nibGsZG8OZzv0SkiK5F2z3mLicWJWpv9iUiRde8UWkurZBJJ2ibxN0f3E4ZbkbNIKXBZ01goTiBW_u6XX1w6Ddc-iaDoWNCOlq46cSZ_cZ7TvBU7y9kGYPLyfuEiY4DB6PsBf3pw5HZj3UMLI2lIU6JSKm2I5Or3si8qm",
  },
  {
    id: 4,
    name: "Dark Chocolate Bar",
    category: "Snacks",
    price: "$1.20",
    lowStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIgWoK1kmM_EZp9fslOWSJwPE7gB6nwXbXC5nkcvZ8OKqeQ9j9j43L8qM7G3lj3S3_JEXFn3Fg4YH4XqnplebQa1zfmXGl_WsPYRpImftO1HqKfKRoFx--81A6wjmgu-RXFA-Ix7C-prKmAe1Hd_F9CI1OPjIv3dG9nPHw_atcqlS_Bs8-xTzgAN59sufah5s4km7gb_Ew3z20pzlGzhWycaoSDUWoRnLol6oL62y3vwaespMe5N6lES7Lv6jzLrSCBH-nuK9G1X3_",
  },
  {
    id: 5,
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: "$2.10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBI1c2-zaYvUBIeiUiEk40ZOQid9atvXPT8ed3psiHFdqHTaXRE4i2SmDMYwynZ-F7K1gsexRFQW_9x7nIvMF8uPMMhREK5vyrNh88MHyGeRJ8vk3xYthkzHcZCUbrm7Ub-zRA3-8drBGaauo8WmbpD6YPEsfeAedSA-Y6pZAFEn6JIwNyxrrqDebJVog0FTjE_XL9qeAeVayqiVnjtqNvYqGsw6MyA22NO1cTWcTQpCO8uzdfl00dptUVRYsnEMvmHNb9BeTjFTiez",
  },
  {
    id: 6,
    name: "Mineral Water 500ml",
    category: "Beverages",
    price: "$0.80",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn--WXGoGg98oz7bUUdDTQkfiPbFShcDi9_JlN5_PYQAqnSsRz5tNGhuG1KADdgVAOJC7Zb8q9wszLxPGsBpQ85fkYfdcSTOyWlmLMaum8RlRSzrq-C2tCcYnkA0q9Uzl4WksCVCB0SMgF0Hf37hfbt7RBO-piQAw9fabyV2JYoQ396LYQCzcrqyNBAnJRN7ojGHuLovelKTCCjojANCO5jvDyGBE2WSTpiKAx-B1kN7O3s08sXsg4_P-kABrF5-kcPeoXxH-DVc4x",
  },
];

// Giỏ hàng mẫu
const cartItems = [
  {
    id: 1,
    name: "Fresh Whole Milk 1L",
    thumb:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAQ4i41uULdpwByq9gS45u71lWeoJyPCgV0UH2W434xaLsSgD_6nxVTTt9UJ2maN65OBu-2zmrFJXa33ixsv1nBbvtSsBRdQ2ZgRfTByplzUZsEJDirNwqsCD0TVkaU6RUNR9xtQrAvvLLrnLR-iovTYrn-x8EBMevvjj6GKgVXmu7wHyYXXdZofyDBgn3OCZtZtXdpOMI-uDMdf34-NoC1KNdQpjiMqqjeh_ZMJC_MWYqDD5d9saDWR8fGvjGl3t8TRuTW-NPv-W7",
    unitPrice: "$2.50",
    qty: 2,
    total: "$5.00",
  },
  {
    id: 2,
    name: "Classic Potato Chips",
    thumb:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoV4oKAJPs1oU2858eNlgtfkkko-39mPsjnkgC9DX6JBuMYH6A-YNsLvk0iGaWKMecsa9W9qIY-3hTJLSVRy-FHWbtuqur1IDXi9cl9suZ7CEkOBl-MImzrTFqRMYJemqGHC2Escn8YFEghLo-ubaxtfbpk6_o5jqiGgj2u_s-kZaBWWOKG2uomqnNL5WIw8yjgfU4U_XYrKL3NtJhsVV_FpsntRBG3za4Awxvmhj3j2OvbFSogrkxtCziNe33BlUW3XQF3O7-i0gV",
    unitPrice: "$1.80",
    qty: 1,
    total: "$1.80",
  },
  {
    id: 3,
    name: "Fresh Orange Juice",
    thumb:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvQBrNDHJvaO7VJLfu5u0GTF0UGUNPJm2bCPyHOqk0xe4v7TS42W2zSchzzkKEToXk1vkDUVpOEn8lkvRf4NQwkrzl65SEWVwg_Ej6XMXX_euqCFmFymjeRHn_UdfJtu6c4hYUFLfmKByVYqMlBzf0XTX4zjZXQrv-m5E6ok8krifWRjBLSP4GZFYG9JdORsCNFgNK38gW3qJb_NwJ7mo_MAO1VKTa5vbXekV7A3aTar1scWTza1aXbei0XR5T4UAShAd9UGJDkQx1",
    unitPrice: "$2.70",
    qty: 3,
    total: "$8.10",
  },
];

const addToCart = (product) => alert(`Đã thêm: ${product.name}`);
const updateQty = (item, qty) => {
  if (qty > 0) item.qty = qty;
};
const removeItem = (item) => cartItems.splice(cartItems.indexOf(item), 1);
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
</style>
