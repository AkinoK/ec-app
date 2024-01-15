import React, {useCallback, useEffect, useState} from 'react';
import {db} from '../firebase/index'
import {SelectBox, TextInput, PrimaryButton} from "../components/UIkit";
import {useDispatch} from "react-redux";
import { getFirestore, doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';

import {saveProduct} from "../reducks/products/operations";
import ImageArea from "../components/Products/ImageArea";

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];
    if (id !== "") {
        id = id.split('/')[1]
    }

    const genders = [
        {id: "all", name: "すべて"},
        {id: "male", name: "メンズ"},
        {id: "female", name: "レディース"}
    ];

    const [name, setName] = useState(""),
          [description, setDescription] = useState(""),
          [images, setImages] = useState([]),
          [category, setCategory] = useState(""),
          [categories, setCategories] = useState([]),
          [gender, setGender] = useState(""),
          [price, setPrice] = useState(""),
          [sizes, setSizes] = useState([]);

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const db = getFirestore();

    useEffect(() => {
        if (id !== "") {
            const productRef = doc(db, 'products', id);
            getDoc(productRef).then(snapshot => {
                if (snapshot.exists()) {
                    const product = snapshot.data();
                    setName(product.name);
                    setDescription(product.description);
                    setImages(product.images);
                    setCategory(product.category);
                    setGender(product.gender);
                    setPrice(product.price);
                    setSizes(product.sizes);
                } 
            });
        }
    }, [id]);

    useEffect(() => {
        const categoriesCollectionRef = collection(db, 'categories');
        const q = query(categoriesCollectionRef, orderBy("order", "asc"));
        getDocs(q).then(snapshots => {
            const list = snapshots.docs.map(doc => doc.data());
            setCategories(list);
        });
    }, []);

    return (
        <section>
            <h2 className="u-text__headline u-text-center">Add and Edit A Product</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"Product name"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"Description"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                />
                <SelectBox
                    label={"Category"} options={categories} required={true} select={setCategory} value={category}
                />
                <SelectBox
                    label={"Gender"} options={genders} required={true} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={"Price"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                />
                {/* <div className="module-spacer--small"/>
                <SetSizesArea sizes={sizes} setSizes={setSizes} /> */}
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"Save the product info"}
                        onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, sizes, images))}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;