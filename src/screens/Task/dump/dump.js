
{/* <View
                    // showsVerticalScrollIndicator={false}
                    style={styles.container}>
                    
                    <View style={styles.row}>
                        <View style={CommonStyles.row}>
                            {/* {title === 'Completed' &&
                                <Ionicons name="checkmark" size={25} />
                            } */}
{/* <P>
                                {person ? 'Assigned by :' : 'Assigned to :'}</P>
                        </View>  */}

{/* {
                            person || team && item?.department === item?.assigned_to?.id ? null :
                                <TouchableWrapper
                                    style={styles.dots}
                                    size={ICON_BUTTON_SIZE}
                                    onPress={() => {
                                        title === "Completed" ? setCompleted(true) :

                                            setModal(true)
                                    }}>
                                    <ImageWrap
                                        url={Images.VerticalDots}
                                        fit={"contain"}
                                        height={2}
                                    />
                                </TouchableWrapper>
                        } */}
{/* </View>
                    <View style={CommonStyles.marginTop_3}>
                        <Button
                            title={person ? `${item?.created_by?.first_name ? item?.created_by?.first_name
                                : ""} ${item?.created_by?.last_name ? item?.created_by?.last_name : ''}`
                                :
                                `${item?.assigned_to?.first_name ? item?.assigned_to?.first_name : ""} ${item?.assigned_to?.last_name ? item?.assigned_to?.last_name : ''}`
                            }
                            textStyle={styles.buttonText}
                            containerStyle={styles.button} />

                        <View style={styles.row1}>
                            <Ionicons name="ellipse-outline" size={15} />
                            <H1 style={styles.title}>{item.title}</H1>
                        </View>

                        <Text style={styles.description}>
                            {item.description}
                        </Text> */}
{/* {
                            title === "Completed" ? null :
                                <React.Fragment>
                                    <View style={styles.row1}>
                                        <Button
                                            title={`Due ${(moment(item?.due_date).format("MMMM Do, YYYY"))}`}
                                            textStyle={styles.buttonText1}
                                            containerStyle={styles.button1}
                                        />
                                        <H1 style={styles.progress}>
                                            <P style={styles.point}>.</P>
                                            {title}</H1>
                                    </View>
                                    <View style={styles.content}>
                                        {
                                            item?.sub_tasks_tasksapp.length > 0 &&
                                            <View style={styles.Row}>
                                                <Image
                                                    resizeMode={'contain'}
                                                    source={{ uri: Images.subTaskIcon }}
                                                    style={styles.downIcon1} />


                                                <FlatList
                                                    data={Object.values(item?.sub_tasks_tasksapp)}
                                                    renderItem={({ item }) =>
                                                        <>
                                                            <View style={CommonStyles.row}>
                                                                <Ionicons name="ellipse-outline" size={15} />
                                                                <Text
                                                                    numberOfLines={1}
                                                                    style={styles.sub}>{item.title}</Text>

                                                                <TouchableOpacity
                                                                    onPress={() => setAction(true)}
                                                                    style={styles.dot}>
                                                                    <Ionicons name="ellipsis-vertical-outline" size={16} style={styles.dots} />
                                                                </TouchableOpacity>

                                                            </View>
                                                            <Button
                                                                title={`${item.sub_assigned_to?.first_name ? item.sub_assigned_to?.first_name : 'Williams Olamidire'}`}
                                                                textStyle={styles.buttonText2}
                                                                containerStyle={styles.button3}
                                                            />
                                                        </>
                                                    }
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                            </View>
                                        }
                                    </View>

                                </React.Fragment> */}


{/* // <KeyboardAvoidingView behavior="padding"> */ }
{/* //     { */ }
{/* //         subTask ? */ }
{/* //             <Formik>
                        //                 {({ submitHandler }) => ( */}

{/* //                     <FlatList */ }
{/* //                         data={subTask}
                        //                         keyExtractor={(item, index) => index.toString()}
                        //                         showsVerticalScrollIndicator={false}
                        //                         showsHorizontalScrollIndicator={false}
                        //                         renderItem={({ item }) => */}
{/* //                             <View style={styles.subRow}> */ }
{/* //                                 <Image */ }
{/* //                                     resizeMode={'contain'}
                        //                                     source={{ uri: Images.subTaskIcon }}
                        //                                     style={styles.downIcon2} />

                        //                                 <Field */}
{/* //                                     component={CustomInput}
                        //                                     placeholder="Add subtasks"
                        //                                     keyboardType={'default'}
                        //                                     style={styles.input}
                        //                                     multiline={true}
                        //                                     value={subData?.[item]}
                        //                                     onChangeData={(value) => { */}
{/* //                                         setSubdata({ ...subData, [item]: value })
                        //                                     }}
                        //                                     right={<TextInput.Icon name={"close"} */}
{/* //                                         style={CommonStyles.marginTop_2}
                        //                                         color={AppColors.darkGray}
                        //                                         onPress={() => handleDelete(item.index)}
                        //                                     />}
                        //                                 />
                        //                             </View>
                        //                         }

                        //                     />
                        //                 )} */}
{/* //             </Formik>
                        //             : null
                        //     }
                        // </KeyboardAvoidingView> */}
{/* <View style={styles.row2}>
                            <Image
                                resizeMode={'contain'}
                                source={{ uri: Images.subTaskIcon }}
                                style={styles.downIcon2} />

                            <View style={styles.btnRow}>
                                <Button
                                    title="Add Subtasks"
                                    textStyle={styles.buttonText2}
                                    containerStyle={styles.button2}
                                    onPress={() => {
                                        _subTask()
                                        setDisplay(true)
                                    }}
                                />
                                {
                                    display &&
                                    <TouchableOpacity
                                        onPress={() => submitHandler(item.id)}
                                        style={styles.newBtn}>
                                        <Ionicons name='send' size={15} color={AppColors.white} />
                                    </TouchableOpacity>
                                }

                            </View>

                        </View>
                    </View>
                </View> */}

{/* <View style={{ flex: 1 }}>
                    <View style={styles.sections}>
                        <H1 style={styles.logs}>Activity log</H1>
                    </View>
                    <SectionList
                        sections={log}
                        renderItem={RenderItem}
                        keyExtractor={item => item.id}
                        renderSectionHeader={({ section: { title } }) => {
                            return (
                                <H1 style={styles.stickyDate}>
                                    {moment(title).calendar().split(" at")[0]}
                                    <P style={styles.point}>.</P>
                                    <P style={styles.day}> {(moment(title).format('dddd, '))} </P>
                                    <P style={styles.day}>{(moment(title).format("MMMM Do"))}</P>
                                </H1>
                            )
                        }}

                    /> */}
{/* <FlatList
                        data={comment}
                        renderItem={renderItem}

                    />
                </View> */}

{/* <CommentTask item={item} />

                <ActionModal isVisible={modal} onHide={() => setModal(false)} item={item} onPressHandle={onPressHandler}
                    loading={loadEdit} />
                <SubTaskActionModal isVisible={action} onHide={() => setAction(false)} item={item} onPressHandle={onPress}
                    loading={loadingSubTask} /> */}
{/* {
                        detailsModal &&
                        <View style={styles.container1}>
                            {
                                [
                                    {
                                        text: "View Task",
                                        type: "To-do"
                                    },
                                    {
                                        text: "Mark task as Complete",
                                        type: "Completed"

                                    }

                                ].map((item, i) => <React.Fragment >
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.textCon}
                                        onPress={() => onPressHandle(item.type)}>
                                        <Text style={styles.text1}>{item?.text} {Loader}</Text>
                                    </TouchableOpacity>
                                    {/* <View style={styles.line} /> */}
{/* {i === 0 ? <View style={styles.line} /> : null}
                                </React.Fragment>) */}
{/* } */ }
{/* </View> */ }



{/* {completed ? <CompletedModal isVisible={completed} onHide={() => setCompleted(false)} title={title} /> : null} */ }
{/* // <View>
                        
                       
                        // <CloseHandler onPress={onHide} />
                        // <View>
                        //     <P color={AppColors.red}>hdjdjhejsekds </P>
                        // </View> */}

{/* {
                                user ? null :
                                    title === 'Completed' ?
                                        <View style={{ marginRight: width(1) }}>
                                            <Ionicons name="checkmark" size={25} style={{ marginTop: height(2.5) }} />
                                        </View> :
                                        <TouchableOpacity style={{ marginRight: width(1) }} onPress={() => {
                                            setModal(true)
                                            item.id
                                        }}>
                                            <Ionicons name="ellipse-outline" size={15} style={{ marginTop: height(1.5) }} />
                                        </TouchableOpacity>
                            } */}
{/* <TouchableOpacity onPress={() => {
                                    setSubTask(true)
                                    title
                                }} >

                                    // 
                                    <P fontSize={3} style={styles.author}>
                                        {
                                            isSent ?
                                                `Assigned to : ${item.assigned_to.first_name ? item.assigned_to.first_name : ""} ${item.assigned_to.last_name ? item.assigned_to.last_name : ''}` :

                                                `${item.created_by.first_name ? item.created_by.first_name : ""} ${item.created_by.last_name ? item.created_by.last_name : ''}`
                                        }

                                    </P>

                                    <View style={styles.row1}>
                                        <Image
                                            resizeMode={'contain'}
                                            source={require('../../assets/images/dummy/Vector.png')}
                                            style={styles.date} />
                                        <P fontSize={3.2} color={'#878787'}>{moment(item?.due_date).format("MMMM Do, YYYY")}</P>
                                    </View>
                                </TouchableOpacity> */}
{/* {
                title === "Completed" ? null :
                    <>
                     

                    </>
            } */}


{/* <TouchableOpacity
                                onPress={() => {
                                    // setSubTask(true)
                                    setDisplay(true)
                                }}
                                style={styles.dots}
                                size={ICON_BUTTON_SIZE} >
                                <ImageWrap
                                    url={Images.VerticalDots}
                                    fit={"contain"}
                                    height={2}
                                />
                            </TouchableOpacity> */}
{/* <View style={styles.container1}>
        {
          [
            {
              text: "View Task",
              type: "To-do"
            },
            {
              text: "Mark task as Complete",
              type: "Completed"

            }

          ].map((item, i) => <React.Fragment >
            <TouchableOpacity
              key={i}
              style={styles.textCon}
              onPress={() => onPressHandle(item.type)}>
              <Text style={styles.text1}>{item?.text} {Loader}</Text>
            </TouchableOpacity>
            {/* <View style={styles.line} /> */}
{/* {i === 0 ? <View style={styles.line} /> : null} */ }
{/* </React.Fragment>) */ }
<View style={styles.textBox}>
    {
        [
            {
                text: "View task",
                type: "view"

            },
            {
                text: "Re-assign task",
                type: "assigned_to"
            }
        ].map((item, i) => <React.Fragment key={i}>
            <TouchableOpacity onPress={() => onPressHandle(item.type)}>
                <Text style={styles.task}>{item?.text} </Text>
            </TouchableOpacity>
            {i === 0 ? <View style={styles.line} /> : null}
        </React.Fragment>)
    }
</View>