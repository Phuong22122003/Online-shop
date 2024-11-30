import { Menu } from "./menu.js";
import { UpSvg, DownSvg, PenSvg, CloseSvg, AddSvg } from "../svg.js";
import { PopUp } from "../popup.js"
import { Toast } from "../toast.js"
import { h } from "../jsx.js";

class Category {
    constructor() {
        this.categoryWrapper = document.createElement('div');
        this.categoryWrapper.className = 'category-wrapper'
        this.getData();
        // this.init()
    }
    async getData() {
        const response = await fetch('/api/v1/categories/all');
        const data = await response.json();
        console.log(data)
        this.init(data)
    }

    init(data) {
        this.data = data;
        this.header = this.createHeader();
        this.table = this.createTable(data);

        this.categoryWrapper.appendChild(this.header);
        this.categoryWrapper.appendChild(this.table);
    }
    createHeader() {
        const header = document.createElement('div');
        header.className = 'category-header';
        const title = document.createElement('h2');
        title.textContent = 'Danh mục sản phẩm';
        const btnAddNew = document.createElement('span');
        btnAddNew.className = 'btn-add';
        btnAddNew.textContent = 'Thêm danh mục';
        btnAddNew.onclick = () => {
            this.createMainCategoryPopUp('add', null, null);
        }
        header.appendChild(title);
        header.appendChild(btnAddNew);
        return header;
    }
    updateMainCategoryInfo(updatedMainCategory) {
        const send = fetch('/api/v1/categories/update-main-info', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedMainCategory)
        })
        return send;
    }
    updateSubCategoryInfo(updatedSubCategory) {
        const send = fetch('/api/v1/categories/update-sub-info', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedSubCategory)
        })
        return send;
    }
    addMainCategory(mainCategory) {
        const send = fetch('/api/v1/categories/add-maincategory', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mainCategory)
        })
        return send;
    }
    addSubCategory(mainCategory) {
        const send = fetch('/api/v1/categories/add-subcategory', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mainCategory)
        })
        return send;
    }
    createMainCategoryPopUp(type, mainCategory, name) {
        const popupComponent = new PopUp();
        const popup = popupComponent.getPopUp();
        popup.className = 'popup';
        const close = document.createElement('span');
        close.innerHTML = CloseSvg();
        close.className = 'close';
        close.onclick = () => {
            popupComponent.remove();
        }
        const title = document.createElement('h2');
        title.textContent = 'Danh mục chính';


        const warning = document.createElement('span');
        warning.textContent = 'Thay đổi giá trị tên sẽ ảnh hưởng đến hệ thống tìm kiếm.';
        warning.className = 'warning';

        const nameWrapper = document.createElement('div');
        nameWrapper.className = 'row';
        const nameLabel = document.createElement('span');
        nameLabel.textContent = 'Tên sản phẩm';
        const nameInput = document.createElement('input');
        if (type == 'update')
            nameInput.value = mainCategory.name;
        nameInput.className = 'input';
        nameWrapper.appendChild(nameLabel);
        nameWrapper.appendChild(nameInput);
        const genderWrapper = document.createElement('div');
        genderWrapper.className = 'row';
        const genderLabel = document.createElement('span');
        genderLabel.textContent = 'Giới tính';
        const genderInput = document.createElement('select');
        genderInput.className = 'input';
        const male = document.createElement('option');
        male.value = 'Nam';
        male.text = 'Nam';
        const female = document.createElement('option');
        female.value = 'Nữ';
        female.text = 'Nữ';
        if (type == 'update') {
            if (mainCategory.gender.toLowerCase() == 'nam') {
                male.selected = true;
            }
            else {
                female.selected = true;
            }
        }
        genderInput.appendChild(male);
        genderInput.appendChild(female);

        genderWrapper.appendChild(genderLabel)
        genderWrapper.appendChild(genderInput);

        const btnUpdate = document.createElement('span');
        btnUpdate.className = 'btn-update';
        if (type == 'update') {
            btnUpdate.textContent = 'Cập nhật';
            btnUpdate.onclick = async () => {
                if (nameInput.value == '') {
                    Toast('Lỗi', 'Tên danh mục không được trống');
                } else {
                    const response = await this.updateMainCategoryInfo({
                        id: mainCategory.id,
                        gender: genderInput.value,
                        name: nameInput.value,
                    })
                    if (response.ok) {
                        name.textContent = nameInput.value;
                        mainCategory.name = nameInput.value;
                    }
                    Toast('Thành công', await response.text())

                    popupComponent.remove();
                }
            }
        }
        else {
            btnUpdate.textContent = 'Thêm';
            btnUpdate.onclick = async () => {
                if (nameInput.value == '') {
                    Toast('Lỗi', 'Tên danh mục không được trống');
                } else {
                    const response = await this.addMainCategory({
                        gender: genderInput.value,
                        name: nameInput.value,
                    })
                    if (response.ok) {
                        window.location.reload();
                    }
                    Toast('Thành công', await response.text())

                    popupComponent.remove();
                }
            }
        }
        popup.appendChild(close);
        popup.appendChild(title);
        popup.appendChild(warning);
        popup.appendChild(nameWrapper);
        popup.appendChild(genderWrapper);
        popup.appendChild(btnUpdate);
    }
    createSubCategoryPopUp(type, subCategory, subName) {
        const popupComponent = new PopUp();
        const popup = popupComponent.getPopUp();
        popup.className = 'popup';

        const close = document.createElement('span');
        close.innerHTML = CloseSvg();
        close.className = 'close';
        close.onclick = () => {
            popupComponent.remove();
        }
        const title = document.createElement('h2');
        title.textContent = 'Danh mục con';


        const warning = document.createElement('span');
        warning.textContent = 'Thay đổi giá trị tên sẽ ảnh hưởng đến hệ thống tìm kiếm.';
        warning.className = 'warning';

        const nameWrapper = document.createElement('div');
        nameWrapper.className = 'row';
        const nameLabel = document.createElement('span');
        nameLabel.textContent = 'Tên sản phẩm';
        const nameInput = document.createElement('input');
        if (type == 'update')
            nameInput.value = subCategory.name;
        nameInput.className = 'input';
        nameWrapper.appendChild(nameLabel);
        nameWrapper.appendChild(nameInput);

        const btnUpdate = document.createElement('span');
        btnUpdate.className = 'btn-update';
        if (type == 'update') {

            btnUpdate.textContent = 'Cập nhật';

            btnUpdate.onclick = async () => {
                if (nameInput.value == '') {
                    Toast('Lỗi', 'Tên danh mục không được trống');
                } else {
                    const response = await this.updateSubCategoryInfo({
                        id: subCategory.id,
                        name: nameInput.value,
                    })
                    if (response.ok) {
                        subCategory.name = nameInput.value;
                        subName.className = nameInput.value;
                    }
                    Toast('Thành công', await response.text())

                    popupComponent.remove();
                }

            }
        }
        else {
            btnUpdate.textContent = 'Thêm';
            btnUpdate.onclick = async () => {
                if (nameInput.value == '') {
                    Toast('Lỗi', 'Tên danh mục không được trống');
                } else {
                    const response = await this.addSubCategory({
                        name: nameInput.value,
                    })
                    if (response.ok) {
                        window.location.reload();
                    }
                    Toast('Thành công', await response.text())

                    popupComponent.remove();
                }

            }
        }

        popup.appendChild(close);
        popup.appendChild(title);
        if(type == 'update')
            popup.appendChild(warning);
        popup.appendChild(nameWrapper);
        popup.appendChild(btnUpdate);
    }
    createTable(data) {
        var table = document.createElement("div");
        table.className = 'table';

        // Tạo phần tử <thead> cho header
        var thead = document.createElement("div");
        thead.className = 'row';
        // Tạo các cột tiêu đề <th>
        var headers = ["Danh mục", "Giới tính", "Trạng thái", "Chức năng"];
        for (var i = 0; i < headers.length; i++) {
            var headerCell = document.createElement("span");
            headerCell.textContent = headers[i];
            thead.appendChild(headerCell);
        }
        table.appendChild(thead);

        if (!Array.isArray(data)) {
            return table;
        }

        data.forEach(maincategory => {

            const tableRow = document.createElement('div');
            tableRow.className = 'row';
            const nameWrapper = document.createElement('div');
            const name = document.createElement('span');
            const svg = document.createElement('span');
            svg.innerHTML = DownSvg();
            const gender = document.createElement('span');

            const status = document.createElement('select');
            status.className = 'status';

            const functionWrapper = document.createElement('span');

            name.textContent = maincategory.name;
            nameWrapper.appendChild(svg);
            nameWrapper.appendChild(name);

            gender.textContent = 'Nam';


            const inactive = document.createElement('option');
            inactive.value = 1;
            inactive.text = 'Ngưng';

            const active = document.createElement('option');
            active.text = 'Kinh doanh';
            active.value = 0;
            if (maincategory.deleteFlat == false) {
                active.selected = true;
            }
            else {
                inactive.selected = true;
            }
            status.appendChild(inactive);
            status.appendChild(active);
            status.onchange = () => {
                this.updateDeleteFlat('main', maincategory.id, status.value)
            }
            const btnEditWrapper = document.createElement('div');
            const penSvg = document.createElement('span');
            penSvg.innerHTML = PenSvg();
            const btnEdit = document.createElement('span');
            btnEdit.textContent = 'Sửa';
            btnEdit.className = 'btn-edit';
            btnEditWrapper.appendChild(penSvg);
            btnEditWrapper.appendChild(btnEdit);
            btnEditWrapper.className = 'btn-wrapper';
            btnEditWrapper.onclick = () => { this.createMainCategoryPopUp('update', maincategory, name) }

            const btnAddWrapper = h(
                "div",
                {className: 'btn-wrapper', onClick: ()=>{this.createSubCategoryPopUp('add',null,null)}},
                AddSvg(),
                h('span',{className:'btn-add'},'Thêm')
            )
            console.log(btnAddWrapper)

            functionWrapper.appendChild(btnEditWrapper);
            functionWrapper.className = 'function-wrapper';
            functionWrapper.appendChild(btnAddWrapper)

            tableRow.appendChild(nameWrapper);
            tableRow.appendChild(gender);
            tableRow.appendChild(status);
            tableRow.appendChild(functionWrapper);
            table.appendChild(tableRow);

            const subWrapper = document.createElement('div');
            subWrapper.className = 'sub-wrapper';
            subWrapper.classList.add('hidden');
            svg.onclick = () => {
                if (subWrapper.classList.contains('hidden')) {
                    svg.innerHTML = UpSvg();
                    subWrapper.classList.remove('hidden');
                    subWrapper.classList.add('visible');
                    setTimeout(() => {
                        subWrapper.style.opacity = '1';
                    }, 0)
                }
                else {
                    svg.innerHTML = DownSvg();
                    subWrapper.style.opacity = '0';
                    setTimeout(() => {
                        subWrapper.classList.remove('visible');
                        subWrapper.classList.add('hidden');
                    }, 500)
                }
            }
            maincategory.subCategories.forEach(subcategory => {
                const subRow = document.createElement('div');
                subRow.className = 'subrow';


                const subName = document.createElement('span');

                // const subNumOfProducts = document.createElement('span');

                // const subStatus = document.createElement('select');
                // subStatus.className = 'status';

                const subFunctionWrapper = document.createElement('span');

                subName.textContent = subcategory.name;

                // subNumOfProducts.textContent = 'Số lượnng: ' +'10';


                const subInactive = document.createElement('option');
                subInactive.value = 1;
                subInactive.text = 'Ngưng';

                const subActive = document.createElement('option');
                subActive.value = 0;
                subActive.text = 'Kinh doanh';
                if (subcategory.deleteFlat == false) {
                    subActive.selected = true;
                }
                else {
                    subInactive.selected = true;
                }
                // subStatus.appendChild(subInactive);
                // subStatus.appendChild(subActive);
                // subStatus.onchange = ()=>{
                //     this.updateDeleteFlat('sub',maincategory.id,status.value)
                // }

                const subBtnEditWrapper = document.createElement('div');
                const subBtnEdit = document.createElement('span');
                subBtnEdit.textContent = 'Sửa';
                subBtnEdit.className = 'btn-edit';
                const subPenSvg = document.createElement('span');
                subPenSvg.innerHTML = PenSvg();
                subBtnEditWrapper.appendChild(subPenSvg)
                subBtnEditWrapper.appendChild(subBtnEdit)
                subBtnEditWrapper.onclick = () => {
                    this.createSubCategoryPopUp('update',subcategory, subName);
                }
                subFunctionWrapper.appendChild(subBtnEditWrapper);
                subFunctionWrapper.className = 'function-wrapper';
                subRow.appendChild(subName);
                // subRow.appendChild(subNumOfProducts);
                // subRow.appendChild(subStatus);
                subRow.appendChild(subFunctionWrapper);
                subWrapper.appendChild(subRow);
            })
            table.appendChild(subWrapper);
        })

        return table;
    }
    updateDeleteFlat(type, id, flat) {
        flat = flat == 1 ? true : false
        console.log(flat)
        let url = `/api/v1/categories/update-${type}-flat`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                flat: flat
            })
        }).then(async response => {
            const message = await response.text();
            if (response.ok) {
                Toast("Thành công", message);
            }
            else Toast("Lỗi", message);
        }).catch(error => console.log(error))
    }
    getCategory() {
        return this.categoryWrapper;
    }
}

function init() {
    const managementWrapper = document.querySelector('.management-wrapper');
    const menu = Menu();
    const categoryComponent = new Category();
    const categories = categoryComponent.getCategory();
    managementWrapper.appendChild(menu);
    managementWrapper.appendChild(categories);
}
init()